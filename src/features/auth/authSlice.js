import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user")

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${baseUrl}/auth/forgot-password`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Token: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { getState, rejectWithValue }) => {
    try {
      const authToken = getState().auth.token;
      const response = await axios.post(
        `${baseUrl}/auth/reset-password`,
        { token, newPassword },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Token: authToken,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.patch(
        `${baseUrl}/auth/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Token: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Token: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    message: null,
    isAuthenticated: !!storedToken,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.message = null;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          const payload = action.payload;
          const errorMessage =
            typeof payload === "string"
              ? payload
              : payload?.error?.message ||
                payload?.message ||
                "Something went wrong";

          // console.log("REJECTED PAYLOAD:", payload);
          state.isLoading = false;
          state.error = errorMessage;
        },
      )
      .addMatcher(
        (action) =>
          action.type === registerUser.fulfilled.type ||
          action.type === loginUser.fulfilled.type,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          state.message = action.payload.message;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.user),
          );
        },
      );
  },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;
