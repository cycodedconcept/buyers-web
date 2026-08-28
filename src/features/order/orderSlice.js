import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../auth/authSlice";
import baseUrl from "../../config/baseUrl";
const CHECKOUT_STORAGE_KEY = "autoparts_checkout_session";

const DEFAULT_ORDER_SUMMARY = {
  subtotalKobo: 0,
  deliveryFeeKobo: 0,
  totalKobo: 0,
};

const getAuthHeaders = (token) =>
  token
    ? {
        Authorization: `Bearer ${token}`,
        Token: token,
      }
    : {};

const readCheckoutSession = () => {
  if (typeof window === "undefined") {
    return {
      orderId: null,
      currentOrder: null,
      paymentReference: null,
      payment: null,
      paymentVerified: false,
    };
  }

  try {
    const rawSession = window.sessionStorage.getItem(CHECKOUT_STORAGE_KEY);

    if (!rawSession) {
      return {
        orderId: null,
        currentOrder: null,
        paymentReference: null,
        payment: null,
        paymentVerified: false,
      };
    }

    const parsedSession = JSON.parse(rawSession);

    return {
      orderId: parsedSession?.orderId || null,
      currentOrder: parsedSession?.currentOrder || null,
      paymentReference: parsedSession?.paymentReference || null,
      payment: parsedSession?.payment || null,
      paymentVerified: parsedSession?.paymentVerified === true,
    };
  } catch {
    return {
      orderId: null,
      currentOrder: null,
      paymentReference: null,
      payment: null,
      paymentVerified: false,
    };
  }
};

const persistCheckoutSession = (state) => {
  if (typeof window === "undefined") {
    return;
  }

  const sessionPayload = {
    orderId: state.orderId,
    currentOrder: state.currentOrder,
    paymentReference: state.paymentReference,
    payment: state.payment,
    paymentVerified: state.paymentVerified,
  };

  if (
    !sessionPayload.orderId &&
    !sessionPayload.currentOrder &&
    !sessionPayload.paymentReference &&
    !sessionPayload.payment
  ) {
    window.sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
    return;
  }

  window.sessionStorage.setItem(
    CHECKOUT_STORAGE_KEY,
    JSON.stringify(sessionPayload),
  );
};

const clearCheckoutSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
};

const getInitialState = () => {
  const storedSession = readCheckoutSession();

  return {
    orderId: storedSession.orderId,
    currentOrder: storedSession.currentOrder,
    paymentReference: storedSession.paymentReference,
    payment: storedSession.payment,
    paymentVerified: storedSession.paymentVerified,
    orderLoading: false,
    paymentInitializing: false,
    paymentVerifying: false,
    orderError: null,
    paymentError: null,
  };
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ paymentMethod, deliveryAddress }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${baseUrl}/orders`,
        {
          paymentMethod,
          deliveryAddress,
        },
        {
          headers: getAuthHeaders(token),
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const initializePayment = createAsyncThunk(
  "order/initializePayment",
  async ({ orderId }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${baseUrl}/payments/initialize`,
        { orderId },
        {
          headers: getAuthHeaders(token),
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async ({ reference }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/payments/callback`, {
        params: {
          reference,
        },
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: getInitialState,
  reducers: {
    resetOrderState: (state) => {
      state.orderId = null;
      state.currentOrder = null;
      state.paymentReference = null;
      state.payment = null;
      state.paymentVerified = false;
      state.orderLoading = false;
      state.paymentInitializing = false;
      state.paymentVerifying = false;
      state.orderError = null;
      state.paymentError = null;
      clearCheckoutSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const order = action.payload?.data || null;

        state.orderLoading = false;
        state.orderError = null;
        state.orderId = order?.id || null;
        state.currentOrder = order;
        state.paymentReference = null;
        state.payment = null;
        state.paymentVerified = false;
        state.paymentError = null;
        persistCheckoutSession(state);
      })
      .addCase(createOrder.rejected, (state, action) => {
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";

        state.orderLoading = false;
        state.orderError = errorMsg;
      })
      .addCase(initializePayment.pending, (state) => {
        state.paymentInitializing = true;
        state.paymentError = null;
      })
      .addCase(initializePayment.fulfilled, (state, action) => {
        const paymentData = action.payload?.data || {};
        const paymentOrder = paymentData?.order || null;
        const nextPayment = paymentData?.payment || null;

        state.paymentInitializing = false;
        state.paymentError = null;
        state.orderId = paymentOrder?.id || state.orderId;
        state.currentOrder = paymentOrder
          ? {
              ...state.currentOrder,
              ...paymentOrder,
            }
          : state.currentOrder;
        state.paymentReference = nextPayment?.reference || null;
        state.payment = nextPayment;
        state.paymentVerified = false;
        persistCheckoutSession(state);
      })
      .addCase(initializePayment.rejected, (state, action) => {
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";

        state.paymentInitializing = false;
        state.paymentError = errorMsg;
      })
      .addCase(verifyPayment.pending, (state, action) => {
        state.paymentVerifying = true;
        state.paymentError = null;
        state.paymentReference =
          action.meta.arg?.reference || state.paymentReference;
        persistCheckoutSession(state);
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        const verificationData = action.payload?.data || {};
        const verifiedOrder = verificationData?.order || null;
        const verifiedPayment = verificationData?.payment || null;

        state.paymentVerifying = false;
        state.paymentError = null;
        state.orderId = verifiedOrder?.id || state.orderId;
        state.currentOrder = verifiedOrder
          ? {
              ...state.currentOrder,
              ...verifiedOrder,
            }
          : state.currentOrder;
        state.paymentReference =
          verifiedPayment?.reference || state.paymentReference;
        state.payment = verifiedPayment || state.payment;
        state.paymentVerified = verificationData?.verified === true;
        persistCheckoutSession(state);
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";

        state.paymentVerifying = false;
        state.paymentError = errorMsg;
      })
      .addCase(logout, (state) => {
        state.orderId = null;
        state.currentOrder = null;
        state.paymentReference = null;
        state.payment = null;
        state.paymentVerified = false;
        state.orderLoading = false;
        state.paymentInitializing = false;
        state.paymentVerifying = false;
        state.orderError = null;
        state.paymentError = null;
        clearCheckoutSession();
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectCurrentOrderId = (state) => state.order.orderId;
export const selectOrderItems = (state) => state.order.currentOrder?.items || [];
export const selectOrderSummary = (state) => ({
  subtotalKobo: state.order.currentOrder?.subtotalKobo || 0,
  deliveryFeeKobo: state.order.currentOrder?.deliveryFeeKobo || 0,
  totalKobo: state.order.currentOrder?.totalKobo || 0,
});
export const selectPaymentReference = (state) => state.order.paymentReference;
export const selectCurrentPayment = (state) => state.order.payment;
export const selectOrderStatus = (state) => state.order.currentOrder?.status || null;
export const selectPaymentStatus = (state) =>
  state.order.currentOrder?.paymentStatus || state.order.payment?.status || null;
export const selectPaymentVerified = (state) => state.order.paymentVerified;
export const selectOrderLoading = (state) => state.order.orderLoading;
export const selectPaymentInitializing = (state) => state.order.paymentInitializing;
export const selectPaymentVerifying = (state) => state.order.paymentVerifying;
export const selectOrderError = (state) => state.order.orderError;
export const selectPaymentError = (state) => state.order.paymentError;
export const selectPaymentLoading = (state) =>
  state.order.paymentInitializing || state.order.paymentVerifying;
export { CHECKOUT_STORAGE_KEY, DEFAULT_ORDER_SUMMARY };
export default orderSlice.reducer;
