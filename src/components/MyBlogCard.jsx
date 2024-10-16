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

function MyBlogCard({ myBlog }) {
  const navigate = useNavigate();
  const { getBlogDetail } = useBlogRequest();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={4}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        getBlogDetail(myBlog._id);
        navigate(`/detail/${myBlog._id}`);
      }}
    >
      <Card sx={{ minHeight: "400px", boxShadow: 3, borderRadius: "10px" }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button variant="contained" color="success">
            Update Blog
          </Button>
          <Button variant="contained" color="error">
            Delete Blog
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}

export default MyBlogCard;
