import { Button, Container, Typography } from "@mui/material";
import React from "react";
import homeBack from "../assets/image/home-background.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <Container
      sx={{
        minWidth: "100%",
        height: "calc(100vh - 64px)",
        backgroundImage: `url(${homeBack})`,
        backgroundSize: "cover",
        objectFit: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          background: "linear-gradient(90deg, #0277BD 0%, #00E5FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "3px 3px 12px rgba(0, 0, 0, 0.5)",
          opacity: 0,
          fontSize: { xs: "3rem", md: "6rem" },
          animation: "fadeIn 5s ease-in-out forwards",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        Infinite Blog
      </Typography>
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          textShadow: "3px 3px 12px rgba(0, 0, 0, 0.7)",
          opacity: 0,
          fontSize: { xs: "1rem", md: "2rem" },
          animation: "fadeIn 5s ease-in-out forwards",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        "Your blog is the canvas where your ideas come to life. Each post is a
        new stroke of creativity, inspiring others and leaving your unique mark
        on the world."
      </Typography>
      {user ? (
        <Button
          variant="outlined"
          sx={{
            color: "#027BC0",
            fontSize: "1.5rem",
            padding: "1rem 3rem",
            marginBottom: "2rem",
            borderRadius: "50px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            textTransform: "capitalize",
            transition: "all 0.5s ease",
            "&:hover": {
              borderColor: "#027BC0",
              transform: "translateY(-5px)",
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
            },
            animation: "fadeIn 2s ease-in-out forwards",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
          onClick={() => navigate("/blogs")}
        >
          Start Reading
        </Button>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{
              color: "#027BC0",
              borderColor: "#027BC0",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              padding: { xs: "0.5rem 1rem", md: "1rem 3rem" },
              borderRadius: "50px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              textTransform: "capitalize",
              transition: "all 0.5s ease",
              "&:hover": {
                borderColor: "#027BC0",
                transform: "translateY(-5px)",
                boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
              },
              animation: "fadeIn 2s ease-in-out forwards",
              "@keyframes fadeIn": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <Typography
            sx={{
              my: "0.6rem",
              fontWeight: "bold",
              color: "gray",
              animation: "fadeIn 2s ease-in-out forwards",
              "@keyframes fadeIn": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
            }}
          >
            Or
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "#027BC0",
              borderColor: "#027BC0",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              padding: { xs: "0.5rem 1rem", md: "1rem 3rem" },
              borderRadius: "50px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              textTransform: "capitalize",
              transition: "all 0.5s ease",
              "&:hover": {
                borderColor: "#027BC0",
                transform: "translateY(-5px)",
                boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
              },
              animation: "fadeIn 2s ease-in-out forwards",
              "@keyframes fadeIn": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </>
      )}
    </Container>
  );
}

export default Home;
