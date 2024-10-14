import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Blogs from "../pages/Blogs";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import MyBlogs from "../pages/MyBlogs";
import PrivateRouter from "./PrivateRouter";

function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/newBlog" element={<NewBlog />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
