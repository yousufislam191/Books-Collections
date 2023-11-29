import React, { useEffect, useState } from "react";
import {
  TextField,
  Link,
  IconButton,
  Paper,
  Box,
  InputAdornment,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";

import SideImage from "../SideImage";
import showToast from "../showToast";
import theme from "../../theme/theme.js";
import FullWidthSubmitButton from "../Button/FullWidthSubmitButton.jsx";
import FullWidthLoadingButton from "../Button/FullWidthLoadingButton.jsx";
import apiHostName from "../../helper/apiConfig.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const userSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helpers) => {
      setLoading(false);
      const res = await axios
        .post(`${apiHostName}/user/login`, {
          email: values.email,
          password: values.password,
        })
        .catch((err) => {
          setLoading(true);
          notify(err.response.status, err.response.data.message);
        });
      if (res.data.success === true) {
        // console.log(res.data.payload.userWithoutPassword);
        setLoading(true);
        notify(res.status, res.data.message);
        setTimeout(() => {
          navigate("/books");
        }, 1500);
      }
    },
    validationSchema: userSchema,
  });
  const notify = (status, message) => showToast(status, message);

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <SideImage />
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 12,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h3" align="left">
                Sign In
              </Typography>
              <Box sx={{ mt: 2 }}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    error={formik.errors.email}
                    onChange={formik.handleChange}
                    helperText={formik.errors.email}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    error={formik.errors.password}
                    onChange={formik.handleChange}
                    helperText={formik.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {loading ? (
                    <FullWidthSubmitButton text={"Sign In"} />
                  ) : (
                    <FullWidthLoadingButton />
                  )}
                </form>
                <div className="flex justify-center text-center gap-3 mt-2">
                  <Typography variant="body2" align="center">
                    Don't have an account?
                  </Typography>
                  <Typography variant="body2" align="center">
                    <Link href="/register">Sign Up</Link>
                  </Typography>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default LoginForm;
