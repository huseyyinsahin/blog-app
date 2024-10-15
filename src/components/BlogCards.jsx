import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import noPhoto from "../assets/image/no-photo.jpg";
import useBlogRequest from "../hooks/useBlogRequest";
import { useSelector } from "react-redux";

export default function BlogCards({ blog, page, selectedCategory, search }) {
  const { likeBlog } = useBlogRequest();
  const { userId } = useSelector((state) => state.auth);
  const userLike = blog.likes.some((like) => like === userId);
  console.log(userLike);
  return (
    <>
      <Card
        key={blog._id}
        sx={{
          width: { xs: "100%", sm: "80%", md: "70%" },
          margin: "1rem",
          height: { xs: "auto", md: "200px" },
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "#e0f7fa",
        }}
      >
        <CardMedia
          component="img"
          alt="blog image"
          height="100%"
          sx={{
            width: { xs: "100%", md: "500px" },
            height: { xs: "200px", md: "100%" },
            borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
            objectFit: "cover",
          }}
          src={
            blog.image ==
            "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg"
              ? noPhoto
              : blog.image
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            width: "100%",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "#0277bd" }}
            >
              {blog.title}
            </Typography>
            <Box>
              <Box
                sx={{ color: "#01579b", fontSize: "1rem" }}
                dangerouslySetInnerHTML={{
                  __html: blog.content.slice(0, 100) + "...",
                }}
              />
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "8px",
              backgroundColor: "#b3e5fc",
              borderRadius: { xs: "0 0 16px 16px", md: "0 0 16px 0" },
            }}
          >
            <Button
              onClick={() => likeBlog(blog._id, page, selectedCategory, search)}
              startIcon={
                userLike ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )
              }
              size="small"
            >
              {blog.likes.length}
            </Button>
            <Button startIcon={<CommentIcon />} size="small">
              {blog.comments.length}
            </Button>
            <Button startIcon={<RemoveRedEyeIcon />} size="small">
              {blog.countOfVisitors}
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
