import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    username: "",
    userId: "",
    loading: "",
  },
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.userId = payload.user._id;
      state.loading = false;
    },
    registerSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.data.username;
      state.userId = payload.data._id;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.username = "";
      state.token = "";
      state.userId = "";
    },
    fail: (state) => {
      state.loading = false;
    },
  },
});

export const { start, loginSuccess, registerSuccess, logoutSuccess, fail } =
  authSlice.actions;
export default authSlice.reducer;
