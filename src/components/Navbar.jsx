import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Drawer,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={3}
      textAlign={{ xs: "center", sm: "left" }}
      alignItems="center"
      {...props}
    >
      {user ? (
        <>
          {pages.slice(0, 3).map((page) => (
            <NavLink
              to={page.to}
              key={page.to}
              style={({ isActive }) => ({
                color: isActive ? "#0288D1" : "black",
                textDecoration: "none",
                fontSize: "1.2rem",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.5s ease",
              })}
            >
              {page.name}
            </NavLink>
          ))}
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
              transition: "color 0.5s ease",
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
  const { logout } = useAuthRequest();
  const { user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (user) {
      setAnchorEl(null);
    }
  }, [user]);

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
                textDecoration: "none",
                fontSize: "1.8rem",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0277BD 0%, #00E5FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                marginLeft: "2rem",
              }}
            >
              Infinite Blog
            </NavLink>

            {!user && <Nav />}

            {user && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Nav />
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <AccountCircleIcon
                    fontSize="large"
                    sx={{ color: "#0288D1" }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                >
                  {user.firstName}
                </Typography>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: { padding: "1rem", minWidth: "200px" },
                  }}
                >
                  <MenuItem
                    onClick={handleMenuClose}
                    component={NavLink}
                    to="/newblog"
                  >
                    New Blog
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={NavLink}
                    to="/myblogs"
                  >
                    My Blogs
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={NavLink}
                    to="/profile"
                  >
                    Profile
                  </MenuItem>
                  <Button
                    onClick={logout}
                    variant="contained"
                    size="small"
                    sx={{
                      padding: "4px 8px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0288D1",
                      color: "white",
                      marginLeft: "2.6rem",
                      marginTop: "10px",
                      "&:hover": {
                        backgroundColor: "#0277BD",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
