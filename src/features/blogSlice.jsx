import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogsData: [],
    pages: {},
    categories: [],
    detail: [],
    comments: [],
    myBlogs: [],
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
      state.comments = payload.data.comments;
      state.loading = false;
    },
    blogComments: (state, { payload }) => {
      state.comments.push(payload.data);
    },
    userBlogs: (state, { payload }) => {
      state.myBlogs = payload.data;
      state.loading = false;
    },
    fail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  start,
  blogData,
  fail,
  categories,
  blogDetail,
  userBlogs,
  blogComments,
} = blogSlice.actions;
export default blogSlice.reducer;
