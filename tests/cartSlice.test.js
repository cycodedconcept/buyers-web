import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  addCartItem,
  DEFAULT_CART_SUMMARY,
  fetchCart,
  selectCartError,
  selectCartItemCount,
  selectCartItems,
  selectCartLoading,
  selectCartSummary,
  updateCartItem,
} from "../src/features/cart/cartSlice";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const authToken = "secure-token";

const buildCartData = (overrides = {}) => ({
  id: 1,
  items: [
    {
      id: 3,
      quantity: 2,
      unitPriceKobo: 2750000,
      lineTotalKobo: 5500000,
      product: {
        id: 4005,
        title: "Fuel Pump Assembly for Toyota Hilux",
        partNumber: "FPA-HIL-1215",
        condition: "used",
        location: "Kano",
        stockQty: 6,
        status: "active",
        primaryImageUrl: "https://example.com/products/fuel-pump-hilux-1.jpg",
        seller: {
          id: 9005,
          businessName: "Northern Truck Parts",
          rating: 4.1,
        },
      },
    },
  ],
  summary: {
    itemCount: 2,
    subtotalKobo: 5500000,
    deliveryFeeKobo: 0,
    totalKobo: 5500000,
  },
  ...overrides,
});

const buildCartResponse = (dataOverrides = {}) => ({
  data: {
    success: true,
    data: buildCartData(dataOverrides),
    message: "Cart fetched successfully.",
  },
});

const createCartTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: (state = { token: authToken }) => state,
      cart: reducer,
    },
    preloadedState,
  });

describe("cartSlice", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.patch.mockReset();
  });

  it("exposes the default cart state and selectors", () => {
    const initialState = reducer(undefined, { type: "unknown" });
    const rootState = { cart: initialState };

    expect(initialState.summary).toEqual(DEFAULT_CART_SUMMARY);
    expect(selectCartItems(rootState)).toEqual([]);
    expect(selectCartSummary(rootState)).toEqual(DEFAULT_CART_SUMMARY);
    expect(selectCartItemCount(rootState)).toBe(0);
    expect(selectCartLoading(rootState)).toBe(false);
    expect(selectCartError(rootState)).toBeNull();
  });

  it("fetches the cart with auth headers and stores backend totals", async () => {
    const store = createCartTestStore();

    axios.get.mockResolvedValueOnce(buildCartResponse());

    await store.dispatch(fetchCart());

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/cart"),
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(store.getState().cart.cartId).toBe(1);
    expect(selectCartItems(store.getState())).toHaveLength(1);
    expect(selectCartSummary(store.getState())).toEqual({
      itemCount: 2,
      subtotalKobo: 5500000,
      deliveryFeeKobo: 0,
      totalKobo: 5500000,
    });
  });

  it("adds a cart item and refetches the cart for fresh summary data", async () => {
    const store = createCartTestStore();

    axios.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: "Item added to cart successfully.",
      },
    });
    axios.get.mockResolvedValueOnce(buildCartResponse());

    await store.dispatch(addCartItem({ productId: 4001, quantity: 2 }));

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/cart/items"),
      { productId: 4001, quantity: 2 },
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/cart"),
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(selectCartItemCount(store.getState())).toBe(2);
  });

  it("updates a cart item by cart item id and refetches the cart", async () => {
    const store = createCartTestStore();

    axios.patch.mockResolvedValueOnce({
      data: {
        success: true,
        message: "Cart item updated successfully.",
      },
    });
    axios.get.mockResolvedValueOnce(
      buildCartResponse({
        items: [
          {
            id: 3,
            quantity: 5,
            unitPriceKobo: 2750000,
            lineTotalKobo: 13750000,
            product: {
              id: 4005,
              title: "Fuel Pump Assembly for Toyota Hilux",
              partNumber: "FPA-HIL-1215",
              condition: "used",
              location: "Kano",
              stockQty: 6,
              status: "active",
              primaryImageUrl:
                "https://example.com/products/fuel-pump-hilux-1.jpg",
              seller: {
                id: 9005,
                businessName: "Northern Truck Parts",
                rating: 4.1,
              },
            },
          },
        ],
        summary: {
          itemCount: 5,
          subtotalKobo: 13750000,
          deliveryFeeKobo: 0,
          totalKobo: 13750000,
        },
      }),
    );

    await store.dispatch(updateCartItem({ cartItemId: 3, quantity: 5 }));

    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/cart/items/3"),
      { quantity: 5 },
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(selectCartItems(store.getState())[0].quantity).toBe(5);
    expect(selectCartSummary(store.getState())).toEqual({
      itemCount: 5,
      subtotalKobo: 13750000,
      deliveryFeeKobo: 0,
      totalKobo: 13750000,
    });
  });

  it("stores cart errors using the backend message", async () => {
    const store = createCartTestStore();

    axios.get.mockRejectedValueOnce({
      response: {
        data: {
          message: "Unauthorized",
        },
      },
    });

    await store.dispatch(fetchCart());

    expect(selectCartLoading(store.getState())).toBe(false);
    expect(selectCartError(store.getState())).toBe("Unauthorized");
  });
});
