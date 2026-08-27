import axios from "axios";
import reducer, {
  fetchAllProducts,
  DEFAULT_ACTIVE_FILTERS,
  DEFAULT_PAGINATION,
} from "../src/features/products/productSlice";
import { createTestStore } from "./renderWithProviders";

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

describe("productSlice", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("exposes the default filter and pagination state", () => {
    const initialState = reducer(undefined, { type: "unknown" });

    expect(initialState.activeFilters).toEqual(DEFAULT_ACTIVE_FILTERS);
    expect(initialState.pagination).toEqual(DEFAULT_PAGINATION);
    expect(initialState.productsLoadingMore).toBe(false);
  });

  it("replaces products and stores pagination on a fresh fetch", async () => {
    const store = createTestStore();
    const firstProduct = buildProduct(1);

    axios.get.mockResolvedValueOnce({
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
        message: "Products fetched successfully.",
      },
    });

    await store.dispatch(
      fetchAllProducts({
        params: {
          condition: "new",
          page: 1,
          limit: 12,
        },
      }),
    );

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/products"),
      expect.objectContaining({
        params: {
          condition: "new",
          page: 1,
          limit: 12,
        },
        headers: {},
      }),
    );

    expect(store.getState().products.products).toEqual([firstProduct]);
    expect(store.getState().products.pagination).toEqual({
      page: 1,
      limit: 12,
      total: 2,
      totalPages: 2,
    });
  });

  it("appends the next page when append mode is enabled", async () => {
    const store = createTestStore();
    const firstProduct = buildProduct(1);
    const secondProduct = buildProduct(2);

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

    await store.dispatch(fetchAllProducts({ params: { page: 1, limit: 12 } }));
    await store.dispatch(
      fetchAllProducts({
        params: { page: 2, limit: 12 },
        append: true,
      }),
    );

    expect(store.getState().products.products).toEqual([
      firstProduct,
      secondProduct,
    ]);
    expect(store.getState().products.pagination.page).toBe(2);
  });

  it("preserves existing products when loading more fails", async () => {
    const store = createTestStore();
    const firstProduct = buildProduct(1);

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
      .mockRejectedValueOnce({
        response: {
          data: {
            message: "Unable to load more products",
          },
        },
      });

    await store.dispatch(fetchAllProducts({ params: { page: 1, limit: 12 } }));
    await store.dispatch(
      fetchAllProducts({
        params: { page: 2, limit: 12 },
        append: true,
      }),
    );

    expect(store.getState().products.products).toEqual([firstProduct]);
    expect(store.getState().products.productsLoadingMore).toBe(false);
    expect(store.getState().products.productsError).toBe(
      "Unable to load more products",
    );
  });
});
