import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { headers, urls } from "../env";
import axios from "axios";

const styleLoading: React.CSSProperties = {
    position: 'absolute',
    top: "50vh",
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto'
}

const styleServerOff: React.CSSProperties = {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    height: '100vh'
}
export const ConnectionChecker = (props: { children: React.ReactNode }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [serverOff, setServerOff] = useState(false)


    useEffect(() => {
        checkConnection();
    }, [location]);

    const checkConnection = async () => {
        try {
            await axios.get(urls.connection_check, { headers });
            setLoading(false)
        } catch (err) {
            localStorage.removeItem('token');
            if (location.pathname === "/login" || location.pathname === "/register") {
                setLoading(false);
                // Check serveravailibility
                try {
                    const response = await axios.get(urls.connection_check);
                } catch (error) {
                    console.log(error);

                    if (axios.isAxiosError(error)) {
                        if (error.message == "Network Error") {
                            setServerOff(true);
                        }
                    }
                }

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
                    {serverOff ?
                        <>
                            <Box sx={styleServerOff}>
                                <Alert severity="error">
                                    <AlertTitle>Network - Error</AlertTitle>
                                    The server is not reachable - <strong>Please try to connect later again !</strong>
                                </Alert>
                            </Box>
                        </>
                        : <>{props.children}</>}
                </>
            }
        </div >
    )
}