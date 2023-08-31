import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChatLarge } from "./ChatContent";

const ChatHeader = (props: { chatInfo: ChatLarge,clickInfo: () => void }) => {
  return (
    <AppBar position="static" sx={{cursor: "pointer"}} onClick={props.clickInfo}>
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt={props.chatInfo.name}
              src="/static/images/avatar/2.jpg"
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, margin: "0px 20px" }}
          >
            {props.chatInfo.name}
          </Typography>
        </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
