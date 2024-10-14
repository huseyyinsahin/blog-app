import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  start,
} from "../features/authSlice";

const useAuthRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const login = async (userData) => {
    dispatch(start());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login/`,
        userData
      );
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        userInfo
      );
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
      await axios(`${process.env.REACT_APP_BASE_URL}/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      });
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
