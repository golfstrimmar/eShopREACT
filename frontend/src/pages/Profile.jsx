// src/components/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Container, Box, Typography, Paper } from "@mui/material";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography variant="h6">
            Please log in to view your profile.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Paper sx={{ padding: 3, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h6" gutterBottom>
            Name: {user.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {user.email}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
