import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Blogs from "../pages/Blogs";
import About from "../pages/About";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import MyBlogs from "../pages/MyBlogs";
import PrivateRouter from "./PrivateRouter";
import Footer from "../components/Footer";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

function AppRouter() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default AppRouter;
