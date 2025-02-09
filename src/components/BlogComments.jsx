import { Avatar, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import userPhoto from "../assets/image/user.png";

function BlogComments() {
  const { comments } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  return (
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
      {comments.map((comment, index) => (
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
          <img
            src={comment.userId.image ? comment.userId.image : userPhoto}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "0.5rem",
              objectFit: "cover",
              marginTop:"7px"
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {comment.userId.username
                ? comment.userId.username
                : user.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", fontSize: "0.7rem" }}
            >
              {new Date(comment.updatedAt).toLocaleString("en-EN")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              {comment.comment}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default BlogComments;
