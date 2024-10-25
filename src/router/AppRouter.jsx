import React, { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import Footer from "../components/Footer";

import Blogs from "../pages/Blogs";
import MyBlogs from "../pages/MyBlogs";
import Detail from "../pages/Detail";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const About = lazy(() => import("../pages/About"));
const Profile = lazy(() => import("../pages/Profile"));
const NewBlog = lazy(() => import("../pages/NewBlog"));
const NotFound = lazy(() => import("../pages/NotFound"));

function AppRouter() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "200px",
            }}
          >
            <CircularProgress size={100} />
          </Container>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <>
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="" element={<PrivateRouter />}>
              <Route path="/newblog" element={<NewBlog />} />
              <Route path="/myblogs" element={<MyBlogs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blogs/detail/:id" element={<Detail />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter;
