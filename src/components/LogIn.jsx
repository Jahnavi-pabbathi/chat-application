import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { Snackbar, Alert } from "@mui/material";
import './form.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const LogIn = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/user-service/api/v1/login",
    //     {
    //       email: email,
    //       password: password
    //     }
    //   );

    //   const user = response.data;
    //   // setUserName(user.name);
    //   localStorage.setItem("userName", user.name);
    //   setOpenSnackbar(true);
    //   setSnackbarMessage("User logged in successfully!");
    //   setSnackbarSeverity("success");
    // } catch (error) {
    //   console.error("Error adding user:", error);
    //   if (error.response && error.response.status === 409) {
    //     const errorMessage = error.response.data.message;
    //     setSnackbarMessage(errorMessage);
    //     setSnackbarSeverity("error");
    //     setOpenSnackbar(true);
    //   } else {
    //     console.error("Error adding user:", error);
    //   }
    // }
    navigate("/room-chat")
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="login">
        <form className="form-style" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Email :</label>
            <input
              autoFocus
              type="email"
              value={email}
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              value={password}
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <Button className="button1" block size="lg" type="submit" onClick={handleLogIn}>
            Login
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}