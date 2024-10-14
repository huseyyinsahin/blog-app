import React, { useState } from "react";
import {
  Stack,
  Box,
  Drawer,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthRequest from "../hooks/useAuthRequest";

const pages = [
  { name: "Blogs", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Login", to: "/login" },
  { name: "Register", to: "/register" },
];

const userPages = [
  { name: "Blogs", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "New Blog", to: "/newBlog" },
  { name: "My Blogs", to: "/myblogs" },
  { name: "Profile", to: "/profile" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ color: "black", display: { xs: "flex", sm: "none" } }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "75%",
            padding: "1rem",
            marginTop: "2rem",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <NavList onClick={toggleDrawer(false)} />
      </Drawer>
      <NavList
        sx={{
          display: { xs: "none", sm: "flex" },
          gap: 4,
        }}
      />
    </>
  );
};

const NavList = ({ ...props }) => {
  const { username } = useSelector((state) => state.auth);
  const { logout } = useAuthRequest();

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={3}
      textAlign={{ xs: "center", sm: "left" }}
      alignItems="center"
      {...props}
    >
      {username ? (
        <>
          {userPages.map((page) => (
            <NavLink
              to={page.to}
              key={page.to}
              style={({ isActive }) => ({
                color: isActive ? "#0288D1" : "black",
                textDecoration: "none",
                fontSize: "1.2rem",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.3s ease",
              })}
            >
              {page.name}
            </NavLink>
          ))}
          <Button
            onClick={logout}
            variant="contained"
            size="small"
            sx={{
              padding: "4px 8px",
              fontSize: "0.9rem",
              backgroundColor: "#0288D1",
              color: "white",
              "&:hover": {
                backgroundColor: "#0277BD",
              },
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        pages.map((page) => (
          <NavLink
            to={page.to}
            key={page.to}
            style={({ isActive }) => ({
              color: isActive ? "#0288D1" : "black",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: isActive ? "bold" : "normal",
              transition: "color 0.3s ease",
            })}
          >
            {page.name}
          </NavLink>
        ))
      )}
    </Stack>
  );
};

const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NavLink
              to="/"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              Blog
            </NavLink>
            <Nav />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
