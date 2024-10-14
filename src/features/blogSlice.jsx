import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: [],
    pages: {},
    categories: [],
    loading: "",
    error: "",
  },
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = false;
    },
    blogData: (state, { payload }) => {
      state.data = payload.data;
      state.pages = payload.details.pages;
      state.loading = false;
    },
    categories: (state, { payload }) => {
      state.categories = payload.data;
    },
    fail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { start, blogData, fail,categories,selectedCategory } = blogSlice.actions;
export default blogSlice.reducer;
