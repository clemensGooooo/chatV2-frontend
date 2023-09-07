import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ChatIcon from "../../../components/Chat/ChatIcon";
import { ChatLarge } from "./ChatFormats";

const ChatHeader = (props: { chat: ChatLarge; clickInfo: () => void }) => {
  return (
    <AppBar
      position="static"
      sx={{ cursor: "pointer", borderTopRightRadius: "30px" }}
      onClick={props.clickInfo}
      color="primary"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
          <ChatIcon
            id={props.chat.chatID}
            image={props.chat.image}
            change={0}
          />
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, margin: "0px 20px" }}
        >
          {props.chat.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
