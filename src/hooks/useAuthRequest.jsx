import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  start,
} from "../features/authSlice";
import useAxios from "./useAxios";

const useAuthRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { axiosPublic, axiosToken } = useAxios();

  const login = async (userData) => {
    dispatch(start());
    try {
      const { data } = await axiosPublic.post("/auth/login/", userData);
      dispatch(loginSuccess(data));
      navigate("/blogs");
      console.log(data);
    } catch (error) {
      toastErrorNotify("Login failed!");
      dispatch(fail());
    }
  };

  const register = async (userInfo) => {
    dispatch(start());
    try {
      const { data } = await axiosPublic.post("/users/", userInfo);
      toastSuccessNotify("Register successful");
      dispatch(registerSuccess(data));
      navigate("/blogs");
      console.log(data);
    } catch (error) {
      toastErrorNotify("Register failed!");
      dispatch(fail());
    }
  };

  const logout = async () => {
    try {
      await axiosToken("/auth/logout/");
      toastSuccessNotify("Logout successful");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      toastErrorNotify("Logout failed!");
    }
  };

  const userUpdate = async (id, userData) => {
    try {
      await axiosToken.put(`/users/${id}`, userData);
      toastSuccessNotify("User update successful");
      login({ username: userData.username, password: userData.password });
    } catch (error) {
      toastErrorNotify("You failed to update the user!");
    }
  };

  return { register, login, logout, userUpdate };
};

export default useAuthRequest;
