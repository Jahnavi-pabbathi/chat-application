import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import { Snackbar, Alert } from "@mui/material";
import './form.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LandingPage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState("")
    const navigate = useNavigate()
    const [imageData, setImageData] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageData(event.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function validateForm() {
        return email.length > 0 && password.length > 0;
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

    const handleSignUp = async () => {
        localStorage.setItem("userName", firstName);
        // const formData = new FormData();
        //     formData.append('file', file);
        // try {
        //     const response = await axios.post(
        //         "http://localhost:8080/user-service/api/v1/register",
        //         {
        //             name: firstName,
        //             email: email,
        //             password: password
        //         }
        //     );

        //     const user = response.data;
        //     // setUserName(user.name);
        //     localStorage.setItem("userName", firstName);
        //     setOpenSnackbar(true);
        //     setSnackbarMessage("User logged in successfully!");
        //     setSnackbarSeverity("success");
        // } catch (error) {
        //     console.error("Error adding user:", error);
        //     if (error.response && error.response.status === 409) {
        //         const errorMessage = error.response.data.message;
        //         setSnackbarMessage(errorMessage);
        //         setSnackbarSeverity("error");
        //         setOpenSnackbar(true);
        //     } else {
        //         console.error("Error adding user:", error);
        //     }
        // }
        navigate("/room-chat")

    }

    const handleLogIn = () => {
        navigate(`/login`)
    }

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     const formData = new FormData();
    //     formData.append('file', selectedFile);
    // };


    return (
        <>
            <div className="SignUp">

                <form className="form-style" onSubmit={handleSubmit}>
                    {/* <div className="profile">
                        <input type="file" onChange={handleFileChange} />
                        <input className="image" type="file" accept="image/*" onChange={handleFileChange} />
                        <br />
                        <br />
                        <label style={{marginLeft:'250px'}}>Upload Photo</label>
                    </div> */}

                    <div className="form-group">
                        <label> Name :</label>
                        <input
                            autoFocus
                            type="name"
                            value={firstName}
                            className="form-control"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

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

                    <Button className="button1" block size="lg" type="submit" disabled={!validateForm()} onClick={handleSignUp}>
                        Sign Up
                    </Button>
                    <br />
                    <p>Already a user?</p>
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