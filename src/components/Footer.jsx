import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#027BC0",
        color: "#fff",
        paddingY: "1rem",
        paddingX: "1.5rem",
        textAlign: "center",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" component="h2" gutterBottom>
          Infinite Blog
        </Typography>

        <Typography variant="body2" sx={{ maxWidth: "600px" }}>
          Keep up with the latest trends in tech and design, and find
          inspiration for your next project!
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link href="#" color="inherit" underline="hover">
            <FacebookIcon fontSize="medium" />
          </Link>
          <Link href="#" color="inherit" underline="hover">
            <XIcon fontSize="medium" />
          </Link>
          <Link href="#" color="inherit" underline="hover">
            <InstagramIcon fontSize="medium" />
          </Link>
          <Link
            href="https://github.com/huseyyinsahin"
            target="_blank"
            color="inherit"
            underline="hover"
          >
            <GitHubIcon fontSize="medium" />
          </Link>
        </Stack>

        <Divider sx={{ bgcolor: "#fff", width: "80%", marginY: "0.5rem" }} />

        <Typography
          variant="caption"
          align="center"
          sx={{ fontSize: "0.8rem" }}
        >
          © {new Date().getFullYear()} Infinite Blog. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;