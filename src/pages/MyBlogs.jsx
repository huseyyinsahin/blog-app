import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import { Grid, Typography, Container } from "@mui/material";
import MyBlogCard from "../components/MyBlogCard";

function MyBlogs() {
  const { user } = useSelector((state) => state.auth);
  const { myBlogs } = useSelector((state) => state.blog);
  const { getUserBlogs } = useBlogRequest();

  useEffect(() => {
    getUserBlogs(user._id);
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginTop: "40px",
          color: "#0288D1",
          fontWeight: "bold",
        }}
      >
        My Blogs
      </Typography>
      <Container
        style={{ marginTop: "20px", marginBottom: "20px", minHeight: "80vh" }}
      >
        <Grid container spacing={2}>
          {myBlogs.map((myBlog) => (
            <MyBlogCard key={myBlog._id} myBlog={myBlog}  />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MyBlogs;
