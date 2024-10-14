import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    username: "",
    loading: "",
  },
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.loading = false;
    },
    registerSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.data.username;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.username = "";
      state.token = "";
    },
    fail: (state) => {
      state.loading = false;
    },
  },
});

export const { start, loginSuccess, registerSuccess, logoutSuccess, fail } =
  authSlice.actions;
export default authSlice.reducer;
