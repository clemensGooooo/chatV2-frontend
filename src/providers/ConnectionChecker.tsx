import { Box, CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { url_main } from "../components/env";
import Dashboard from "../pages/Dashboard";

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
            await axios.get(url_main+'check_connection', { headers });
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
                : <Dashboard />
            }
        </div >
    )
}