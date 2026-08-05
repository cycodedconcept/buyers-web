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
      condition: ""
    },
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload.data.products
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.productDetails = action.payload.data
      })
      .addMatcher((action) => action.type.startsWith("product/") && action.type.endsWith("/pending"), (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addMatcher((action) => action.type.startsWith("product/") && action.type.endsWith("/rejected"), (state, action) => {
        console.log("REJECTED PAYLOAD:", payload);
        state.isLoading = false;
        const payload = action.payload;
        const errorMsg = typeof payload === "string" ? payload : payload?.error?.message || payload?.message || "Something went wrong";
        state.error = errorMsg
      })
  }
})


export default productSlice.reducer