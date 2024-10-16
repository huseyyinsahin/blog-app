import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import userPhoto from "../assets/image/user.png";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAuthRequest from "../hooks/useAuthRequest";

function Profile({}) {
  const { user } = useSelector((state) => state.auth);
  const { userUpdate } = useAuthRequest();

  const [profileEdit, setProfileEdit] = useState(true);

  const handleProfileEdit = () => {
    setProfileEdit(!profileEdit);
    if (profileEdit) {
      toastSuccessNotify("Profile editing enabled.");
    } else {
      toastErrorNotify("Profile editing disabled!");
    }
  };

  const [userData, setUserData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
    city: user.city,
    bio: user.bio,
    password: "",
  });

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userUpdate(user._id, userData);
  };

  return (
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          backgroundColor: "#f5f5f5",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#0288d1", fontWeight: "bold" }}
        >
          Profile
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Avatar
            alt="User Image"
            src={user.image || userPhoto}
            sx={{ width: 200, height: 200 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button onClick={handleProfileEdit} variant="contained">
            Edit Profile
          </Button>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 600,
            margin: "auto",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                value={userData.username}
                name="username"
                type="text"
                onChange={handleUserData}
                fullWidth
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                value={userData.firstName}
                name="firstName"
                type="text"
                onChange={handleUserData}
                fullWidth
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                value={userData.lastName}
                name="lastName"
                type="text"
                onChange={handleUserData}
                fullWidth
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                value={userData.email}
                name="email"
                type="text"
                onChange={handleUserData}
                fullWidth
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Image"
                variant="outlined"
                value={userData.image}
                name="image"
                type="text"
                onChange={handleUserData}
                fullWidth
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                value={userData.city}
                name="city"
                type="text"
                onChange={handleUserData}
                fullWidth
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Bio"
                variant="outlined"
                value={userData.bio}
                name="bio"
                type="text"
                onChange={handleUserData}
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  readOnly: profileEdit,
                }}
              />
            </Grid>
            {!profileEdit && (
              <Grid item xs={12}>
                <TextField
                  label="Please enter your password to edit your profile"
                  variant="outlined"
                  value={userData.password}
                  name="password"
                  type="password"
                  onChange={handleUserData}
                  fullWidth
                  InputProps={{
                    readOnly: profileEdit,
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
