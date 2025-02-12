import React, { useEffect } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Container,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAuthRequest from "../hooks/useAuthRequest";
import { useSelector } from "react-redux";
import noImage from "../assets/image/user.png";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userDetails } = useAuthRequest();
  const { userDetail, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    userDetails(id);
  }, []);

  return loading ? (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={150} color="primary" />
    </Container>
  ) : (
    <Box
      sx={{
        padding: "32px",
        maxWidth: "1200px",
        margin: "auto",
        minHeight: "90vh",
      }}
    >
      <Paper
        sx={{
          padding: "32px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "16px",
          boxShadow: 10,
          background: "#ffffff",
          marginBottom: "32px",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            maxWidth: "140px",
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: 4,
            maxHeight: "200px",
            margin: { xs: "auto", md: "0" },
          }}
          image={userDetail.image ? userDetail.image : noImage}
          alt={`${userDetail.firstName} ${userDetail.lastName}`}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "32px",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#333", marginBottom: "12px" }}
          >
            {`${userDetail.firstName} ${userDetail.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            {userDetail.username}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555", marginBottom: "8px" }}
          >
            {userDetail.email}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555", marginBottom: "8px" }}
          >
            {userDetail.city}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555", marginBottom: "16px" }}
          >
            {userDetail.bio}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            {new Date(userDetail.createdAt).toLocaleDateString("en-EN")}
          </Typography>
        </CardContent>
      </Paper>

      <Typography variant="h5" sx={{ color: "#1976d2", marginBottom: "16px" }}>
        Recent Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {userDetail.blogs?.map((blog) => (
          <Grid
            onClick={() => navigate(`/blogs/detail/${blog._id}`)}
            item
            xs={12}
            sm={6}
            md={3}
            key={blog._id}
            sx={{
              cursor: "pointer",
            }}
          >
            <Paper
              sx={{
                padding: "16px",
                boxShadow: 6,
                borderRadius: "12px",
                height: "400px",
                cursor: "pointer",
              }}
            >
              <CardMedia
                component="img"
                height="140px"
                image={blog.image}
                alt={blog.title}
                sx={{
                  borderRadius: "8px",
                  boxShadow: 3,
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                {blog.title.length > 15
                  ? `${blog.title.slice(0, 15)}...`
                  : blog.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: "16px", wordWrap: "break-word" }}
              >
                {blog.content.slice(0, 80)}...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                👀 Visitors: {blog.countOfVisitors}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                👍 Likes: {blog.likes.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                💬 Comments: {blog.comments.length}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDetail;
