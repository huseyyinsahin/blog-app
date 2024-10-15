import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const PrivateRouter = () => {
  const { username } = useSelector((state) => state.auth);

  if (!username) {
    toastErrorNotify("Please log in!");
    return <Navigate to="/" />;
  }

  return username && <Outlet />;
};

export default PrivateRouter;
