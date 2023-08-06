import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

export const AppBarWebsite = () => {
    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Site
                </Typography>
                <Link to={"/dashboard"}>
                    <Button color="inherit" sx={{
                        color: "white"
                    }}>go to dashboard</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}