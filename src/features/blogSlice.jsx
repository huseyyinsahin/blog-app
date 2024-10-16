import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogsData: [],
    pages: {},
    categories: [],
    detail: [],
    loading: "",
    error: "",
  },
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = false;
    },
    blogData: (state, { payload }) => {
      state.blogsData = payload.data;
      state.pages = payload.details.pages;
      state.loading = false;
    },
    categories: (state, { payload }) => {
      state.categories = payload.data;
      state.loading = false;
    },
    blogDetail: (state, { payload }) => {
      state.detail = payload.data;
      state.loading = false;
    },
    fail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { start, blogData, fail, categories, blogDetail } =
  blogSlice.actions;
export default blogSlice.reducer;
