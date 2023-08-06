import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { url_main } from "../env";
import axios from "axios";

const styleLoading: React.CSSProperties = {
    position: 'absolute',
    top: "50vh",
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto'
}

export const ConnectionChecker = (props: { children: React.ReactNode }) => {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        try {
            const headers = {
                Authorization: 'Bearer ' + token,
            };
            await axios.get(url_main + 'check_connection', { headers });
            setLoading(false)
            
        } catch (err) {
            localStorage.removeItem('token');
            if (location.pathname === "/login" ||location.pathname === "/register") {
                setLoading(false);
            } else {
                window.location.href = "/login";
            }
        }
    }
    return (
        <div className="App">
            {loading ?
                <Box sx={{ position: "relative" }}>
                    <CircularProgress disableShrink
                        style={styleLoading} />
                </Box>
                : <>
                    {props.children}
                </>
            }
        </div >
    )
}