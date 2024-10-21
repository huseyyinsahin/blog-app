import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useAuthRequest from "../hooks/useAuthRequest";
import { Link } from "react-router-dom";
import loginPhoto from "../assets/image/login-register.jpg";

const Login = () => {
  const { login } = useAuthRequest();

  const loginSchema = object({
    email: string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
      .matches(
        /[@$!%*?&]+/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
  });

  return (
    <Container
      sx={{
        minWidth: "100%",
        backgroundImage: `url(${loginPhoto})`,
        backgroundSize: "cover",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            login(values);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <Form>
              <Box
                sx={{
                  padding: 3,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    color: "#0288d1",
                    marginBottom: 1,
                    textAlign: "center",
                  }}
                >
                  Login
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  onBlur={handleBlur}
                  helperText={errors.email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  onBlur={handleBlur}
                  helperText={errors.password}
                />
                <Typography
                  sx={{ textAlign: "center", color: "#0288d1", mt: 1 }}
                >
                  {Object.keys(touched).length > 0 && isValid && (
                    <CheckCircleIcon />
                  )}
                </Typography>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 2,
                    mt: 2,
                    backgroundColor: "#0288d1",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                  }}
                >
                  Sign In
                </Button>
                <Typography variant="body2" align="center">
                  Don't have an account? <Link to="/register">Sign up</Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
};

export default Login;
