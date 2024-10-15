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

function BlogDetail() {
  const { detail, loading } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getBlogDetail, likeBlog, commentBlog } = useBlogRequest();
  const userLike = detail?.likes?.some((like) => like === user._id);
  const { id } = useParams();
  const [comment, setComment] = useState({
    blogId: detail._id,
    comment: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getBlogDetail(id);
  }, []);

  const handleComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = () => {
    commentBlog(comment);
    setComment({
      blogId: detail._id,
      comment: "",
    });
    setTimeout(() => {
      getBlogDetail(id);
    }, 2000);
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
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
        {detail.title}
      </Typography>

      <CardMedia
        component="img"
        height="400"
        image={
          detail.image ==
          "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg"
            ? noPhoto
            : detail.image
        }
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
          <Avatar
            sx={{
              bgcolor: "primary.main",
              marginRight: "0.5rem",
              width: 48,
              height: 48,
            }}
          >
            <PersonIcon sx={{ fontSize: "1.5rem" }} />
          </Avatar>
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
          {new Date(detail.createdAt).toLocaleString("tr-TR")}
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

      <Box
        sx={{
          margin: "1rem 0",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          Comments
        </Typography>
        {detail.comments?.map((comment, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              margin: "0.5rem 0",
              padding: "0.5rem",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                marginRight: "0.5rem",
                width: 35,
                height: 35,
              }}
            >
              <PersonIcon sx={{ fontSize: "1.5rem" }} />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {comment.userId.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", fontSize: "0.7rem" }}
              >
                {new Date(comment.updatedAt).toLocaleString("tr-TR")}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555" }}>
                {comment.comment}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default BlogDetail;
