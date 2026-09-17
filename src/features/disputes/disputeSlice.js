import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
import { logout } from "../auth/authSlice";

const getAuthHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}`, Token: token } : {};

const getErrorMessage = (payload) =>
  typeof payload === "string"
    ? payload
    : payload?.error?.message || payload?.message || "Something went wrong";

export const fetchBuyerDisputes = createAsyncThunk(
  "disputes/fetchBuyerDisputes",
  async ({ page = 1, limit = 10, status } = {}, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/disputes`, {
        params: { page, limit, ...(status ? { status } : {}) },
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

export const fetchOrderDisputes = createAsyncThunk(
  "disputes/fetchOrderDisputes",
  async ({ orderId, page = 1, limit = 10 }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/orders/${orderId}/disputes`, {
        params: { page, limit },
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

export const fetchDisputeDetails = createAsyncThunk(
  "disputes/fetchDisputeDetails",
  async (disputeId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/disputes/${disputeId}`, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

export const createDispute = createAsyncThunk(
  "disputes/createDispute",
  async ({ orderId, sellerId, reason, description, evidence }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();
      formData.append("sellerId", String(sellerId));
      formData.append("reason", reason);
      formData.append("description", description);
      for (const file of evidence || []) formData.append("evidence", file);
      const response = await axios.post(`${baseUrl}/orders/${orderId}/disputes`, formData, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

export const respondToDispute = createAsyncThunk(
  "disputes/respondToDispute",
  async ({ disputeId, message, attachments }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();
      formData.append("message", message);
      for (const file of attachments || []) formData.append("attachments", file);
      const response = await axios.post(`${baseUrl}/disputes/${disputeId}/respond`, formData, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

const initialState = {
  disputes: [],
  pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
  disputesLoading: false,
  disputesError: null,
  orderDisputes: [],
  orderDisputesPagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
  orderDisputesLoading: false,
  orderDisputesError: null,
  disputeDetails: null,
  disputeDetailsLoading: false,
  disputeDetailsError: null,
  disputeSubmitting: false,
  disputeSubmitError: null,
};

const disputeSlice = createSlice({
  name: "disputes",
  initialState,
  reducers: {
    clearDisputeSubmitError: (state) => {
      state.disputeSubmitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyerDisputes.pending, (state) => {
        state.disputesLoading = true;
        state.disputesError = null;
      })
      .addCase(fetchBuyerDisputes.fulfilled, (state, action) => {
        state.disputesLoading = false;
        state.disputes = action.payload?.data?.disputes || [];
        state.pagination = action.payload?.data?.pagination || initialState.pagination;
      })
      .addCase(fetchBuyerDisputes.rejected, (state, action) => {
        state.disputesLoading = false;
        state.disputesError = getErrorMessage(action.payload);
      })
      .addCase(fetchOrderDisputes.pending, (state) => {
        state.orderDisputesLoading = true;
        state.orderDisputesError = null;
        state.orderDisputes = [];
      })
      .addCase(fetchOrderDisputes.fulfilled, (state, action) => {
        state.orderDisputesLoading = false;
        state.orderDisputes = action.payload?.data?.disputes || [];
        state.orderDisputesPagination = action.payload?.data?.pagination || initialState.orderDisputesPagination;
      })
      .addCase(fetchOrderDisputes.rejected, (state, action) => {
        state.orderDisputesLoading = false;
        state.orderDisputesError = getErrorMessage(action.payload);
      })
      .addCase(fetchDisputeDetails.pending, (state) => {
        state.disputeDetails = null;
        state.disputeDetailsLoading = true;
        state.disputeDetailsError = null;
      })
      .addCase(fetchDisputeDetails.fulfilled, (state, action) => {
        state.disputeDetailsLoading = false;
        state.disputeDetails = action.payload?.data || null;
      })
      .addCase(fetchDisputeDetails.rejected, (state, action) => {
        state.disputeDetailsLoading = false;
        state.disputeDetailsError = getErrorMessage(action.payload);
      })
      .addCase(createDispute.pending, (state) => {
        state.disputeSubmitting = true;
        state.disputeSubmitError = null;
      })
      .addCase(createDispute.fulfilled, (state, action) => {
        state.disputeSubmitting = false;
        state.disputeDetails = action.payload?.data || null;
      })
      .addCase(createDispute.rejected, (state, action) => {
        state.disputeSubmitting = false;
        state.disputeSubmitError = getErrorMessage(action.payload);
      })
      .addCase(respondToDispute.pending, (state) => {
        state.disputeSubmitting = true;
        state.disputeSubmitError = null;
      })
      .addCase(respondToDispute.fulfilled, (state, action) => {
        state.disputeSubmitting = false;
        state.disputeDetails = action.payload?.data || null;
      })
      .addCase(respondToDispute.rejected, (state, action) => {
        state.disputeSubmitting = false;
        state.disputeSubmitError = getErrorMessage(action.payload);
      })
      .addCase(logout, () => initialState);
  },
});

export const { clearDisputeSubmitError } = disputeSlice.actions;
export const selectBuyerDisputes = (state) => state.disputes.disputes;
export const selectBuyerDisputesPagination = (state) => state.disputes.pagination;
export const selectBuyerDisputesLoading = (state) => state.disputes.disputesLoading;
export const selectBuyerDisputesError = (state) => state.disputes.disputesError;
export const selectOrderDisputes = (state) => state.disputes.orderDisputes;
export const selectOrderDisputesPagination = (state) => state.disputes.orderDisputesPagination;
export const selectOrderDisputesLoading = (state) => state.disputes.orderDisputesLoading;
export const selectOrderDisputesError = (state) => state.disputes.orderDisputesError;
export const selectDisputeDetails = (state) => state.disputes.disputeDetails;
export const selectDisputeDetailsLoading = (state) => state.disputes.disputeDetailsLoading;
export const selectDisputeDetailsError = (state) => state.disputes.disputeDetailsError;
export const selectDisputeSubmitting = (state) => state.disputes.disputeSubmitting;
export const selectDisputeSubmitError = (state) => state.disputes.disputeSubmitError;
export default disputeSlice.reducer;
