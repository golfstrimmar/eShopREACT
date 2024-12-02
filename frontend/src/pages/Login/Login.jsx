// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/authActions";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ---------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          formData
        );
        const { user, token } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        dispatch(setUser(user, token));
        setSuccessMessage("Login successful");

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              variant="outlined"
            />
          </div>
          {errors && <Typography color="error">{errorMessage}</Typography>}
          {successMessage && (
            <Typography color="success">{successMessage}</Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
