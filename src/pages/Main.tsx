import { Box, AppBar, Toolbar, IconButton, Typography, Button, Tab } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeSelecter } from "../components/ThemeButton";
import { Messages } from "../components/MessagesButton";



///// https://mui.com/material-ui/react-menu/

const Main = () => {
    const style = {
        margin: "0px 10px"
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Node.JS
                        </Typography>
                        <div style={style}>
                            <ThemeSelecter />
                        </div>
                        <div style={style}>
                            <Messages />
                        </div>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            
        </div>
    )
}

export default Main;