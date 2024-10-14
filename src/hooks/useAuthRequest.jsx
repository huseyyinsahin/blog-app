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
      toastSuccessNotify("Login successful");
      dispatch(loginSuccess(data));
      navigate("/");
      console.log(data);
    } catch (error) {
      toastErrorNotify("Login failed");
      dispatch(fail());
    }
  };

  const register = async (userInfo) => {
    dispatch(start());
    try {
      const { data } = await axiosPublic.post("/users/", userInfo);
      toastSuccessNotify("Register successful");
      dispatch(registerSuccess(data));
      navigate("/");
      console.log(data);
    } catch (error) {
      toastErrorNotify("Register failed");
      dispatch(fail());
    }
  };

  const logout = async () => {
    dispatch(start());
    try {
      await axiosToken("/auth/logout/");
      toastSuccessNotify("Logout successful");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      toastErrorNotify("Logout failed");
      dispatch(fail());
    }
  };

  return { register, login, logout };
};

export default useAuthRequest;