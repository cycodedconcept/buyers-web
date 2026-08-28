import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../auth/authSlice";
import baseUrl from "../../config/baseUrl";

const DEFAULT_CART_SUMMARY = {
  itemCount: 0,
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

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/cart`, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, quantity }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      await axios.post(
        `${baseUrl}/cart/items`,
        { productId, quantity },
        {
          headers: getAuthHeaders(token),
        },
      );
      return await dispatch(fetchCart()).unwrap();
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || error || "Something went wrong");
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      await axios.patch(
        `${baseUrl}/cart/items/${cartItemId}`,
        { quantity },
        {
          headers: getAuthHeaders(token),
        },
      );
      return await dispatch(fetchCart()).unwrap();
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || error || "Something went wrong");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    items: [],
    summary: DEFAULT_CART_SUMMARY,
    cartLoading: false,
    cartError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = null;
        state.cartId = action.payload?.data?.id || null;
        state.items = action.payload?.data?.items || [];
        state.summary = action.payload?.data?.summary || DEFAULT_CART_SUMMARY;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.cartLoading = false;
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";
        state.cartError = errorMsg;
      })
      .addCase(addCartItem.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = null;
        state.cartId = action.payload?.data?.id || null;
        state.items = action.payload?.data?.items || [];
        state.summary = action.payload?.data?.summary || DEFAULT_CART_SUMMARY;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.cartLoading = false;
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";
        state.cartError = errorMsg;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = null;
        state.cartId = action.payload?.data?.id || null;
        state.items = action.payload?.data?.items || [];
        state.summary = action.payload?.data?.summary || DEFAULT_CART_SUMMARY;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.cartLoading = false;
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";
        state.cartError = errorMsg;
      })
      .addCase(logout, (state) => {
        state.cartId = null;
        state.items = [];
        state.summary = DEFAULT_CART_SUMMARY;
        state.cartLoading = false;
        state.cartError = null;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartSummary = (state) => state.cart.summary;
export const selectCartItemCount = (state) => state.cart.summary?.itemCount || 0;
export const selectCartLoading = (state) => state.cart.cartLoading;
export const selectCartError = (state) => state.cart.cartError;
export { DEFAULT_CART_SUMMARY };
export default cartSlice.reducer;
