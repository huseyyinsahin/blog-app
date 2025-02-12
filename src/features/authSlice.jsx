import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    token: "",
    userDetail: "",
    loading: "",
  },
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
    },
    registerSuccess: (state, { payload }) => {
      state.user = payload.data;
      state.token = payload.token;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.user = "";
      state.token = "";
      state.loading = false;
    },
    getUserDetail: (state, { payload }) => {
      state.userDetail = payload.data;
      state.loading = false;
    },
    fail: (state) => {
      state.loading = false;
    },
  },
});

export const {
  start,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  getUserDetail,
  fail,
} = authSlice.actions;
export default authSlice.reducer;
