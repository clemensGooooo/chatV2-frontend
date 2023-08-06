import { Box, Paper, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { url_main } from "../../components/env";

export const Account = () => {
    const [profile, setProfile] = useState({ username: "" })

    useEffect(() => {
        getProfile();
    }, [])

    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem("token")
    };

    const getProfile = async () => {
        try {
            const response = await axios.get(url_main + "user/profile", { headers });
            setProfile(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                padding: "30px",
                margin: "20px",
                width: "100%"
            },
        }}>
            <Paper elevation={2}>
                <Typography variant="h4">
                    Your Profile:
                </Typography>
                <Box sx={{ padding: "10px" }}>
                    <TextField label="Username"
                        fullWidth
                        value={profile.username}
                    />
                </Box>
            </Paper>
        </Box>
    )
}