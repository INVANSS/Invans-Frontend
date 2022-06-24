import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../api/FirebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig);

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = (event) => {
    event.preventDefault();
    setLoading(true);

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        navigate("/img", { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        setShowError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <Box
      sx={{
        backgroundImage: "url(/Login/g.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "transparent",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "0 1px 0 1px solid #ccc",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={login}
            autoComplete="off"
            sx={{
              paddingX: 10,
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiInputLabel-outlined": {
                color: "white",
              },
              "& .MuiOutlinedInput-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="Remy Sharp"
                src="/Login/LOGO.png"
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            {showError && (
              <Alert onClose={() => setShowError(false)} severity="error">
                Usuario o contraseña incorrecta
              </Alert>
            )}
            <TextField
              value={username}
              type={"email"}
              onChange={(event) => setUsername(event.target.value)}
              margin="normal"
              fullWidth
              required
              id="username-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              margin="normal"
              fullWidth
              id="password-basic"
              label="Password"
              variant="outlined"
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                sx={{
                  marginTop: 2,
                  color: "white",
                  border: "1px solid white",
                  "& .MuiLoadingButton-loading": {
                    color: "white",
                    border: "1px solid white",
                  },
                }}
                type={"submit"}
                loading={loading}
                loadingIndicator="Loading..."
                variant="outlined"
              >
                LOGIN
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
