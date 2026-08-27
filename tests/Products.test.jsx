import axios from "axios";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import Products from "../src/components/layout/Products";
import { renderWithProviders } from "./renderWithProviders";
import { DEFAULT_ACTIVE_FILTERS } from "../src/features/products/productConstants";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const buildProduct = (id, overrides = {}) => ({
  id,
  title: `Product ${id}`,
  category: {
    id: 1000 + id,
    name: "Brake System",
    slug: "brake-system",
  },
  condition: "new",
  priceKobo: 1500000,
  location: "Lagos",
  seller: {
    id: 5000 + id,
    businessName: `Seller ${id}`,
    rating: 4.8,
  },
  primaryImageUrl: `https://example.com/product-${id}.jpg`,
  ...overrides,
});

describe("Products", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("resets back to all products when All Parts is clicked", async () => {
    const user = userEvent.setup();
    const filteredProduct = buildProduct(1, {
      title: "Filtered Product",
    });
    const allProductsResult = buildProduct(2, {
      title: "All Products Result",
      condition: "used",
    });

    axios.get
      .mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            products: [filteredProduct],
            pagination: {
              page: 1,
              limit: 8,
              total: 1,
              totalPages: 1,
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            products: [allProductsResult],
            pagination: {
              page: 1,
              limit: 8,
              total: 1,
              totalPages: 1,
            },
          },
        },
      });

    const preloadedState = {
      auth: {
        token: null,
      },
      products: {
        products: [],
        productDetails: null,
        availableFilters: {},
        activeFilters: {
          ...DEFAULT_ACTIVE_FILTERS,
          partName: "brake",
          category: "brake-system",
          condition: "new",
        },
        pagination: {
          page: 1,
          limit: 8,
          total: 0,
          totalPages: 1,
        },
        productsLoading: false,
        productsLoadingMore: false,
        productDetailsLoading: false,
        productsError: null,
        productDetailsError: null,
      },
    };

    const { store } = renderWithProviders(
      <Products fourGridDisplay={false} />,
      { preloadedState },
    );

    expect(await screen.findByText("Filtered Product")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /all parts/i }));

    await waitFor(() => {
      expect(store.getState().products.activeFilters).toEqual(
        DEFAULT_ACTIVE_FILTERS,
      );
    });

    expect(await screen.findByText("All Products Result")).toBeInTheDocument();
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("/products"),
      expect.objectContaining({
        params: {},
      }),
    );
  });
});
