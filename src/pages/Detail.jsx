import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import noPhoto from "../assets/image/no-photo.jpg";
import useBlogRequest from "../hooks/useBlogRequest";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate, useParams } from "react-router-dom";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import BlogComments from "../components/BlogComments";

function BlogDetail() {
  const { detail, loading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getBlogDetail, likeBlog, commentBlog } = useBlogRequest();
  const userLike = detail?.likes?.some((like) => like === user._id);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogDetail(id);
  }, []);

  const [comment, setComment] = useState({
    blogId: detail._id,
    comment: "",
  });

  const handleComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = () => {
    commentBlog(comment);
    setComment({
      blogId: detail._id,
      comment: "",
    });
  };

  const handleReload = () => {
    getBlogDetail(id);
  };

  return error ? (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        An error occurred while loading the site. Please try refreshing the
        page!
      </Alert>
      <Button onClick={handleReload} variant="contained">
        Reload the page
      </Button>
    </Container>
  ) : loading ? (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={100} />
    </Container>
  ) : (
    <Card
      sx={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: "20px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Button
        sx={{ textTransform: "capitalize" }}
        onClick={() => navigate(-1)}
        variant="contained"
        startIcon={<ReplyAllIcon />}
      >
        Back
      </Button>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        {detail?.title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          textAlign: "center",
          color: "gray",
          marginBottom: "1rem",
        }}
      >
        {detail.categoryId?.name}
      </Typography>
      <CardMedia
        component="img"
        height="400"
        image={detail.image}
        alt="Nature"
        sx={{
          borderRadius: "20px",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      <CardContent sx={{ padding: "2rem" }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8, fontSize: "1.1rem", color: "#555" }}
          dangerouslySetInnerHTML={{
            __html: detail.content,
          }}
        ></Typography>
      </CardContent>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="1rem"
      >
        <Box display="flex" alignItems="center">
          <img
            src={detail.userId?.image}
            alt="Profile"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              marginRight: "0.5rem",
              objectFit: "cover",
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {detail.userId?.username}
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          {new Date(detail.createdAt).toLocaleString("en-EN")}
        </Typography>
      </Box>

      <CardActions disableSpacing sx={{ justifyContent: "space-around" }}>
        <Button
          onClick={() => {
            likeBlog(detail._id);
          }}
          startIcon={
            userLike ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          aria-label="like"
          sx={{ "&:hover": { color: "red" } }}
        >
          <Typography variant="subtitle2" marginLeft="0.5rem">
            {detail.likes?.length}
          </Typography>
        </Button>

        <IconButton aria-label="comments" sx={{ "&:hover": { color: "blue" } }}>
          <CommentIcon />
          <Typography variant="subtitle2" marginLeft="0.5rem">
            {detail.comments?.length}
          </Typography>
        </IconButton>

        <IconButton aria-label="views" sx={{ "&:hover": { color: "green" } }}>
          <VisibilityIcon />
          <Typography variant="subtitle2" marginLeft="0.5rem">
            {detail?.countOfVisitors}
          </Typography>
        </IconButton>
      </CardActions>

      <Box sx={{ margin: "1rem 0" }}>
        <TextField
          label="Comment"
          variant="outlined"
          name="comment"
          fullWidth
          multiline
          rows={4}
          value={comment.comment}
          onChange={handleComment}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ marginTop: "1rem" }}
        >
          Add Comment
        </Button>
      </Box>

      <BlogComments />
    </Card>
  );
}

export default BlogDetail;
