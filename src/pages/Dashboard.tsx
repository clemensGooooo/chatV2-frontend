import {
    Box, AppBar, Toolbar, Typography, Button, Drawer,
    Divider, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText,
    SxProps,
    Theme
} from "@mui/material";

import { ThemeSelecter } from "../components/ThemeButton";
import { Messages } from "../components/MessagesButton";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { url_main } from "../components/env";
import { useEffect, useState } from "react";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkPrivileges();
    }, [])

    const checkPrivileges = async () => {
        try {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            };
            await axios.get(url_main + 'admin', { headers });
            setIsAdmin(true);
        } catch (err) {

        }
    }

    const style = {
        margin: "0px 10px"
    }
    const styleAppBar: SxProps<Theme> = {
        width: `calc(100% - ${240}px)`,
        ml: `240px`
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed"
                sx={isAdmin ? styleAppBar : undefined}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Node.JS
                    </Typography>
                    <div style={style}>
                        <ThemeSelecter />
                    </div>
                    <div style={style}>
                        <Messages />
                    </div>
                    <Link to="/dashboard/account" style={{
                        textDecoration: 'none',
                        color: "inherit"
                    }}>
                        <Button color="inherit">
                            account
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            {isAdmin ?
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <Typography variant="h5"><strong>Admin Panel</strong></Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <Link to="/dashboard/news-article" style={{
                                color: "inherit",
                                textDecoration: "none",
                                width: "100%"
                            }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <NewspaperIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"News articles"} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link to="/dashboard/users" style={{
                                color: "inherit",
                                textDecoration: "none",
                                width: "100%"
                            }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Show all users"} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                : <></>}
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', padding: "60px 10px" }}
            >
                <Outlet />
            </Box>
        </Box >
    )
}

export default Dashboard;