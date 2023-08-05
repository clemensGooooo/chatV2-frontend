import { Box, CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Main from "../pages/Main";

export const ConnectionChecker = () => {
    const [loader, setLoader] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        try {
            const headers = {
                Authorization: 'Bearer ' + token,
            };
            await axios.get('http://localhost:5000/check_connection', { headers });
            setLoader(false)
        } catch (err) {
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
    }
    return (
        <div className="App">
            {loader ?
                <Box sx={{ position: "relative" }}>
                    <CircularProgress disableShrink style={{ position: 'absolute', top: "50vh", left: 0, bottom: 0, right: 0, margin: 'auto' }} />
                </Box>
                : <Main />
            }
        </div >
    )
}