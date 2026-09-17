import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../config/baseUrl";

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchBlogPosts",
  async ({ page = 1, perPage = 9, sort = "latest" } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/posts`, {
        params: { page, per_page: perPage, sort },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

export const fetchBlogPostDetails = createAsyncThunk(
  "blog/fetchBlogPostDetails",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/posts/${encodeURIComponent(slug)}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  },
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    pagination: { page: 1, limit: 9, total: 0, totalPages: 1 },
    postsLoading: false,
    postsError: null,
    postDetails: null,
    postDetailsLoading: false,
    postDetailsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts = action.payload?.data?.posts || [];
        state.pagination = action.payload?.data?.pagination || state.pagination;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.postsLoading = false;
        const payload = action.payload;
        state.postsError =
          typeof payload === "string"
            ? payload
            : payload?.error?.message || payload?.message || "Something went wrong";
      })
      .addCase(fetchBlogPostDetails.pending, (state) => {
        state.postDetails = null;
        state.postDetailsLoading = true;
        state.postDetailsError = null;
      })
      .addCase(fetchBlogPostDetails.fulfilled, (state, action) => {
        state.postDetailsLoading = false;
        state.postDetails = action.payload?.data || null;
      })
      .addCase(fetchBlogPostDetails.rejected, (state, action) => {
        state.postDetailsLoading = false;
        const payload = action.payload;
        state.postDetailsError =
          typeof payload === "string"
            ? payload
            : payload?.error?.message || payload?.message || "Something went wrong";
      });
  },
});

export const selectBlogPosts = (state) => state.blog.posts;
export const selectBlogPagination = (state) => state.blog.pagination;
export const selectBlogPostsLoading = (state) => state.blog.postsLoading;
export const selectBlogPostsError = (state) => state.blog.postsError;
export const selectBlogPostDetails = (state) => state.blog.postDetails;
export const selectBlogPostDetailsLoading = (state) => state.blog.postDetailsLoading;
export const selectBlogPostDetailsError = (state) => state.blog.postDetailsError;
export default blogSlice.reducer;
