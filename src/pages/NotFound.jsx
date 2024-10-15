import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 65px)",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "1rem" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
