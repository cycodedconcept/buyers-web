import axios from "axios";
import { act, screen, waitFor } from "@testing-library/react";
import ListingGrid from "../src/pages/ListingGrid";
import { renderWithProviders } from "./renderWithProviders";

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
  priceKobo: 1850000,
  location: "Lagos",
  seller: {
    id: 9000 + id,
    businessName: `Seller ${id}`,
    rating: 4.7,
  },
  primaryImageUrl: `https://example.com/product-${id}.jpg`,
  ...overrides,
});

describe("ListingGrid", () => {
  let intersectionHandler;

  beforeEach(() => {
    axios.get.mockReset();
    intersectionHandler = undefined;

    class MockIntersectionObserver {
      constructor(callback) {
        intersectionHandler = callback;
      }

      observe() {}

      disconnect() {}

      unobserve() {}
    }

    window.IntersectionObserver = MockIntersectionObserver;
    globalThis.IntersectionObserver = MockIntersectionObserver;
  });

  it("fetches the next page when the sentinel intersects", async () => {
    const firstProduct = buildProduct(1, {
      title: "Front Brake Pad Set for Toyota Camry",
    });
    const secondProduct = buildProduct(2, {
      title: "Rear Shock Absorber Pair for Honda Accord",
      category: {
        id: 1003,
        name: "Suspension & Steering",
        slug: "suspension-steering",
      },
    });

    axios.get
      .mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            products: [firstProduct],
            pagination: {
              page: 1,
              limit: 12,
              total: 2,
              totalPages: 2,
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          success: true,
          data: {
            products: [secondProduct],
            pagination: {
              page: 2,
              limit: 12,
              total: 2,
              totalPages: 2,
            },
          },
        },
      });

    renderWithProviders(<ListingGrid />, { route: "/product-listing" });

    expect(await screen.findByText(firstProduct.title)).toBeInTheDocument();
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("/products"),
      expect.objectContaining({
        params: {
          page: 1,
          limit: 12,
        },
      }),
    );

    await act(async () => {
      intersectionHandler?.([{ isIntersecting: true }]);
    });

    expect(await screen.findByText(secondProduct.title)).toBeInTheDocument();
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("/products"),
      expect.objectContaining({
        params: {
          page: 2,
          limit: 12,
        },
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/you've reached the end of the catalog/i),
      ).toBeInTheDocument();
    });
  });
});
