import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#027BC0",
        color: "#fff",
        padding: "1rem",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" component="h2" gutterBottom>
          Infinite Blog
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link href="#" color="inherit" underline="hover">
            <FacebookIcon />
          </Link>
          <Link href="#" color="inherit" underline="hover">
            <TwitterIcon />
          </Link>
          <Link href="#" color="inherit" underline="hover">
            <InstagramIcon />
          </Link>
          <Link
            href="https://github.com/huseyyinsahin"
            target="_blank"
            color="inherit"
            underline="hover"
          >
            <GitHubIcon />
          </Link>
        </Stack>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Infinite Blog. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
