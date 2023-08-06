import { Box, Typography } from "@mui/material"
import { AppBarWebsite } from "../AppBarWebsite"

export const Error404 = () => {
    return (
        <div>
            <AppBarWebsite />
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <Typography variant="h2" gutterBottom>
                    404 - Not found!
                </Typography>
            </Box>
        </div>
    )
}