import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import MyBlogCard from "../components/MyBlogCard";
import { useNavigate } from "react-router-dom";

function MyBlogs() {
  const { user } = useSelector((state) => state.auth);
  const { myBlogs, loading, error } = useSelector((state) => state.blog);
  const { getUserBlogs } = useBlogRequest();
  const navigate = useNavigate();

  useEffect(() => {
    getUserBlogs(user._id);
  }, []);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          An error occurred while loading the site. Please try refreshing the
          page!
        </Alert>
      )}
      {loading ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={150} />
        </Container>
      ) : (
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
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              minHeight: "80vh",
            }}
          >
            <Grid container spacing={2}>
              {myBlogs.length > 0 ? (
                myBlogs.map((myBlog) => (
                  <MyBlogCard key={myBlog._id} myBlog={myBlog} />
                ))
              ) : (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                  }}
                >
                  <Typography sx={{ marginBottom: "40px", fontSize: "2rem" }}>
                    No Blogs Data...
                  </Typography>
                  <Button
                    onClick={() => navigate("/newBlog")}
                    variant="contained"
                  >
                    Write Blog
                  </Button>
                </Container>
              )}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default MyBlogs;
