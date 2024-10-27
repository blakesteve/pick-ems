import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Auth() {
  const [username, setUserName] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [fullName, setFullName] = useState<String>();
  const [password, setPassword] = useState<String>("");
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const minLength = 12;

  // const handleSignup = async () => {
  //   const response = await fetch("/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       fullName,
  //       disabled: false,
  //       hashed_password: password,
  //     }),
  //   });

  //   if (response.ok) {
  //     // Handle successful signup, e.g., redirect to login
  //   } else {
  //     // Handle error
  //     const errorData = await response.json();
  //     console.error("Signup error:", errorData);
  //   }
  // };

  // const handleLogin = async () => {
  //   const response = await fetch("/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     localStorage.setItem("authToken", data.token); // Store the auth token
  //     // Redirect or handle successful login
  //   } else {
  //     // Handle login error
  //     const errorData = await response.json();
  //     console.error("Login error:", errorData);
  //   }
  // };

  return (
    <Box component="form">
      <h2>Sign Up / Log in</h2>
      <Grid container justifyContent="center" spacing={2}>
        <Stack
          spacing={0.5}
          sx={{ "--hue": Math.min(password.length * 10, 120) }}
        >
          <TextField
            placeholder="Name"
            size="small"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          <TextField
            placeholder="User Name"
            size="small"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
          <TextField
            placeholder="Email"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            type="password"
            size="small"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <LinearProgress
            variant="determinate"
            value={Math.min((password.length * 100) / minLength, 100)}
            sx={{
              bgcolor: "background.level3",
              color: "hsl(var(--hue) 80% 40%)",
            }}
          />
          {/* @ts-ignore next-line */}
          <Typography
            level="body-xs"
            sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {password.length > 0 && password.length < 3 && "Very weak"}
            {password.length >= 3 && password.length < 6 && "Weak"}
            {password.length >= 6 && password.length < 10 && "Strong"}
            {password.length >= 10 && "Very strong"}
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
}

export default Auth;
