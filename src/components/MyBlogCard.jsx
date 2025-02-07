import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useBlogRequest from "../hooks/useBlogRequest";
import DeleteBlog from "./DeleteBlog";
import { useState } from "react";
import UpdateBlog from "./UpdateBlog";

function MyBlogCard({ myBlog }) {
  const navigate = useNavigate();
  const { getBlogDetail, deleteUserBlogs } = useBlogRequest();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirm) => {
    setOpen(false);
    if (confirm) {
      deleteUserBlogs(myBlog._id, user._id);
    }
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  return (
    <Grid item xs={12} sm={12} md={4}>
      <Card sx={{ minHeight: "400px", boxShadow: 3, borderRadius: "10px" }}>
        <Box
          component="div"
          onClick={() => {
            getBlogDetail(myBlog._id);
            navigate(`/blogs/detail/${myBlog._id}`);
          }}
          sx={{ cursor: "pointer" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={myBlog.image}
            alt={myBlog.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {myBlog.title.slice(0, 22)}...
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{
                __html: myBlog.content.slice(0, 180) + "...",
              }}
              variant="body2"
              color="text.secondary"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong>
                {myBlog.isPublish ? "Published" : "Draft"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(myBlog.createdAt).toLocaleDateString("en-EN")}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateOpen}
          >
            Update Blog
          </Button>
          <Button variant="contained" color="error" onClick={handleOpen}>
            Delete Blog
          </Button>
        </Box>
      </Card>
      <DeleteBlog open={open} handleClose={handleClose} />
      <UpdateBlog
        openUpdate={openUpdate}
        handleUpdateClose={handleUpdateClose}
        myBlog={myBlog}
      />
    </Grid>
  );
}

export default MyBlogCard;
