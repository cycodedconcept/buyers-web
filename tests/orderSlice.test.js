import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  CHECKOUT_STORAGE_KEY,
  createOrder,
  DEFAULT_ORDER_SUMMARY,
  initializePayment,
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentPayment,
  selectOrderError,
  selectOrderItems,
  selectOrderLoading,
  selectOrderStatus,
  selectOrderSummary,
  selectPaymentError,
  selectPaymentReference,
  selectPaymentStatus,
  selectPaymentVerified,
  verifyPayment,
} from "../src/features/order/orderSlice";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const authToken = "secure-token";

const buildOrderData = (overrides = {}) => ({
  id: 2,
  status: "pending_payment",
  paymentMethod: "paystack",
  paymentStatus: "pending",
  subtotalKobo: 17450000,
  deliveryFeeKobo: 0,
  totalKobo: 17450000,
  deliveryAddress: {
    label: "Workshop",
    street: "12 Adeola Odeku Street",
    city: "Ikeja",
    state: "Lagos",
    phone: "08012345678",
  },
  items: [
    {
      productId: 4001,
      title: "Brake Pad Set",
      quantity: 2,
      unitPriceKobo: 8725000,
      lineTotalKobo: 17450000,
      seller: {
        id: 9005,
        businessName: "Northern Truck Parts",
        rating: 4.1,
      },
    },
  ],
  createdAt: "2026-08-16T09:30:00.000Z",
  updatedAt: "2026-08-16T09:30:00.000Z",
  ...overrides,
});

const buildCreateOrderResponse = (orderOverrides = {}) => ({
  data: {
    success: true,
    data: buildOrderData(orderOverrides),
    message: "Order created successfully.",
  },
});

const buildInitializePaymentResponse = (overrides = {}) => ({
  data: {
    success: true,
    data: {
      authorizationUrl: "https://paystack.test/checkout/apt-order",
      accessCode: "ACCESS_CODE_123",
      order: {
        id: 2,
        paymentMethod: "paystack",
        paymentStatus: "pending",
        status: "pending_payment",
        totalKobo: 17450000,
      },
      payment: {
        amountKobo: 17450000,
        provider: "paystack",
        reference: "APT-2-1782852021494-D8CA6C92",
        status: "pending",
      },
      ...overrides,
    },
    message: "Payment initialized successfully.",
  },
});

const buildVerifyPaymentResponse = (overrides = {}) => ({
  data: {
    success: true,
    data: {
      verified: true,
      order: {
        id: 2,
        paymentMethod: "paystack",
        paymentStatus: "paid",
        status: "confirmed",
        totalKobo: 17450000,
      },
      payment: {
        amountKobo: 17450000,
        provider: "paystack",
        reference: "APT-2-1782852021494-D8CA6C92",
        status: "paid",
      },
      ...overrides,
    },
    message: "Payment verified successfully.",
  },
});

const createOrderTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: (state = { token: authToken }) => state,
      order: reducer,
    },
    preloadedState,
  });

describe("orderSlice", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.patch.mockReset();
    window.sessionStorage.clear();
  });

  it("exposes the default order state and selectors", () => {
    const store = createOrderTestStore();
    const rootState = store.getState();

    expect(selectCurrentOrder(rootState)).toBeNull();
    expect(selectCurrentOrderId(rootState)).toBeNull();
    expect(selectOrderItems(rootState)).toEqual([]);
    expect(selectOrderSummary(rootState)).toEqual(DEFAULT_ORDER_SUMMARY);
    expect(selectPaymentReference(rootState)).toBeNull();
    expect(selectCurrentPayment(rootState)).toBeNull();
    expect(selectOrderStatus(rootState)).toBeNull();
    expect(selectPaymentStatus(rootState)).toBeNull();
    expect(selectPaymentVerified(rootState)).toBe(false);
    expect(selectOrderLoading(rootState)).toBe(false);
    expect(selectOrderError(rootState)).toBeNull();
    expect(selectPaymentError(rootState)).toBeNull();
  });

  it("creates an order with auth headers and stores the backend response", async () => {
    const store = createOrderTestStore();

    axios.post.mockResolvedValueOnce(buildCreateOrderResponse());

    await store.dispatch(
      createOrder({
        paymentMethod: "paystack",
        deliveryAddress: {
          label: "Workshop",
          street: "12 Adeola Odeku Street",
          city: "Ikeja",
          state: "Lagos",
          phone: "08012345678",
        },
      }),
    );

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/orders"),
      {
        paymentMethod: "paystack",
        deliveryAddress: {
          label: "Workshop",
          street: "12 Adeola Odeku Street",
          city: "Ikeja",
          state: "Lagos",
          phone: "08012345678",
        },
      },
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(selectCurrentOrderId(store.getState())).toBe(2);
    expect(selectCurrentOrder(store.getState())?.status).toBe("pending_payment");
    expect(selectOrderItems(store.getState())).toHaveLength(1);
    expect(selectOrderSummary(store.getState())).toEqual({
      subtotalKobo: 17450000,
      deliveryFeeKobo: 0,
      totalKobo: 17450000,
    });
  });

  it("stores the Paystack reference after initializing payment and hydrates from session storage", async () => {
    const store = createOrderTestStore({
      auth: { token: authToken },
      order: {
        orderId: 2,
        currentOrder: buildOrderData(),
        paymentReference: null,
        payment: null,
        paymentVerified: false,
        orderLoading: false,
        paymentInitializing: false,
        paymentVerifying: false,
        orderError: null,
        paymentError: null,
      },
    });

    axios.post.mockResolvedValueOnce(buildInitializePaymentResponse());

    await store.dispatch(initializePayment({ orderId: 2 }));

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/payments/initialize"),
      { orderId: 2 },
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(selectPaymentReference(store.getState())).toBe(
      "APT-2-1782852021494-D8CA6C92",
    );
    expect(selectCurrentPayment(store.getState())).toEqual({
      amountKobo: 17450000,
      provider: "paystack",
      reference: "APT-2-1782852021494-D8CA6C92",
      status: "pending",
    });

    const storedSession = JSON.parse(
      window.sessionStorage.getItem(CHECKOUT_STORAGE_KEY),
    );

    expect(storedSession.paymentReference).toBe(
      "APT-2-1782852021494-D8CA6C92",
    );

    const hydratedStore = createOrderTestStore();

    expect(selectCurrentOrderId(hydratedStore.getState())).toBe(2);
    expect(selectPaymentReference(hydratedStore.getState())).toBe(
      "APT-2-1782852021494-D8CA6C92",
    );
  });

  it("verifies the stored reference and updates the order as paid", async () => {
    const store = createOrderTestStore({
      auth: { token: authToken },
      order: {
        orderId: 2,
        currentOrder: buildOrderData(),
        paymentReference: "APT-2-1782852021494-D8CA6C92",
        payment: {
          amountKobo: 17450000,
          provider: "paystack",
          reference: "APT-2-1782852021494-D8CA6C92",
          status: "pending",
        },
        paymentVerified: false,
        orderLoading: false,
        paymentInitializing: false,
        paymentVerifying: false,
        orderError: null,
        paymentError: null,
      },
    });

    axios.get.mockResolvedValueOnce(buildVerifyPaymentResponse());

    await store.dispatch(
      verifyPayment({ reference: "APT-2-1782852021494-D8CA6C92" }),
    );

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/payments/callback"),
      expect.objectContaining({
        params: {
          reference: "APT-2-1782852021494-D8CA6C92",
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          Token: authToken,
        },
      }),
    );
    expect(selectPaymentVerified(store.getState())).toBe(true);
    expect(selectOrderStatus(store.getState())).toBe("confirmed");
    expect(selectPaymentStatus(store.getState())).toBe("paid");
    expect(selectCurrentPayment(store.getState())?.status).toBe("paid");
  });
});
