import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { headers, logout, urls, url_main } from "../../../env";

const gridStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

export const Account = () => {
  const [profile, setProfile] = useState({ username: "", profileImage: "" });
  const [currently_loading, setCurrently_loading] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageData, setImageData] = useState(null as null | string);
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [openPasswdChange, setOpenPasswdChange] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  const handleButtonClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setCurrently_loading(true);

      const formData = new FormData();
      formData.append("image", file);

      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      axios
        .post(url_main + "user/profile/image", formData, { headers })
        .then((response) => {
          setCurrently_loading(false);
          setSuccess(true);
        })
        .catch((error) => {
          setCurrently_loading(false);
          setErr(true);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, [success]);

  const getProfile = async () => {
    try {
      const response = await axios.get(urls.user_profile, { headers });
      setProfile(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [success]);

  const fetchImage = async () => {
    try {
      const response: AxiosResponse<ArrayBuffer> = await axios.get(
        urls.user_profile_image,
        {
          headers,
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      setImageData(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const changePassword = async () => {
    try {
      await axios.post(
        urls.user_password_change,
        {
          newPassword: newPassword,
          password: password,
        },
        { headers }
      );
      setOpenPasswdChange(false);
      setNewPassword("");
    } catch (err) {
      setPasswordErr(true);
    }
  };

  const handleClose = () => {
    setOpenPasswdChange(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          padding: "30px",
          margin: "20px",
          width: "100%",
        },
      }}
    >
      <Paper elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={gridStyle}>
            {imageData ? (
              <Avatar
                alt="Image profile"
                src={imageData}
                sx={{ width: 128, height: 128 }}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">My profile</Typography>
            <Box sx={{ margin: "10px 0px", padding: "10px" }}>
              <TextField
                label="Username"
                fullWidth
                disabled
                value={profile.username}
              />
            </Box>
            <Box sx={{ padding: "10px" }}>
              <TextField
                label="Password"
                fullWidth
                type={"password"}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Box>
            {newPassword !== "" ? (
              <Button
                sx={{
                  margin: "10px",
                }}
                onClick={() => setOpenPasswdChange(true)}
              >
                Change Password
              </Button>
            ) : (
              <></>
            )}
            <br />
            <div>
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleButtonClick}
                sx={{
                  margin: "10px",
                }}
              >
                Upload new image
              </Button>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={logout}
                sx={{
                  margin: "10px",
                }}
              >
                Logout
              </Button>
            </div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={currently_loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
              open={err}
              autoHideDuration={3000}
              onClose={() => setErr(false)}
              message="Error uploading image. Please try again later."
            />
            <Snackbar
              open={success}
              autoHideDuration={3000}
              onClose={() => setSuccess(false)}
              message="Successful uploaded !"
            />
          </Grid>
        </Grid>
        <Dialog open={openPasswdChange} onClose={handleClose}>
          <DialogTitle>Password change</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your old password to change the password!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              error={passwordErr}
              helperText={
                passwordErr
                  ? "Something went wrong /check your old pwd !"
                  : undefined
              }
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={changePassword}>Change</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};
