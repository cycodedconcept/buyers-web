import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (params = {}, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/products`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${baseUrl}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetails: null,
    availableFilters: {},
    activeFilters: {
      partName: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      category: "",
      minPriceKobo: "",
      maxPriceKobo: "",
      condition: "",
    },
    productsLoading: false,
    productDetailsLoading: false,
    productsError: null,
    productDetailsError: null,
  },
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productsError = null;
        state.products = action.payload.data.products;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.productsLoading = false;
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";
        state.productsError = errorMsg;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.productDetailsLoading = true;
        state.productDetailsError = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetailsError = null;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productDetailsLoading = false;
        const payload = action.payload;
        const errorMsg =
          typeof payload === "string"
            ? payload
            : payload?.error?.message ||
              payload?.message ||
              "Something went wrong";
        state.productDetailsError = errorMsg;
      });
  },
});

export const { setActiveFilter } = productSlice.actions;
export default productSlice.reducer;
