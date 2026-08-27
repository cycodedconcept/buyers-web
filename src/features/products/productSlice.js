import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DEFAULT_ACTIVE_FILTERS,
  LISTING_PAGE_LIMIT,
} from "./productConstants";

const baseUrl = import.meta.env.VITE_API_URL;
const DEFAULT_PAGINATION = {
  page: 1,
  limit: LISTING_PAGE_LIMIT,
  total: 0,
  totalPages: 1,
};

const normalizeFetchArgs = (args = {}) => {
  if (!args || Array.isArray(args)) {
    return { params: {}, append: false };
  }

  if ("params" in args || "append" in args) {
    return {
      params: args.params || {},
      append: args.append === true,
    };
  }

  return {
    params: args,
    append: false,
  };
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (args = {}, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const { params, append } = normalizeFetchArgs(args);
      const response = await axios.get(`${baseUrl}/products`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return {
        ...response.data,
        meta: {
          append,
        },
      };
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

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetails: null,
    availableFilters: {},
    activeFilters: DEFAULT_ACTIVE_FILTERS,
    pagination: DEFAULT_PAGINATION,
    productsLoading: false,
    productsLoadingMore: false,
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
      .addCase(fetchAllProducts.pending, (state, action) => {
        const { append } = normalizeFetchArgs(action.meta.arg);
        state.productsLoading = !append;
        state.productsLoadingMore = append;
        state.productsError = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        const incomingProducts = action.payload?.data?.products || [];
        const shouldAppend = action.payload?.meta?.append === true;
        const responsePagination = action.payload?.data?.pagination;

        state.productsLoading = false;
        state.productsLoadingMore = false;
        state.productsError = null;
        state.products = shouldAppend
          ? [...state.products, ...incomingProducts]
          : incomingProducts;
        state.pagination = responsePagination || {
          ...DEFAULT_PAGINATION,
          total: state.products.length,
        };
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsLoadingMore = false;
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
export { DEFAULT_ACTIVE_FILTERS, DEFAULT_PAGINATION };
export default productSlice.reducer;
