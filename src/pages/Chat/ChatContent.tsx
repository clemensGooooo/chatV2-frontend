import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { headers, urls } from "../../env";
import { timeAgo } from "../../providers/useFunctions";
import ChatMessages from "./ChatMessages";
import ChatSend from "./ChatSend";
import ChatBox from "./Message";

interface ChatContentProps {
  chatID: number;
}

export interface Message {
  _id: string;
  user: string;
  message: string;
  timestamp: string;
  chatID: number;
  type: string;
  readed: any[]; ///////////////////////////////////////////////////////////////////////
  __v: number;
}

interface Chat {
  chatID: number;
  name: string;
  members: string[];
  lastInteraction: string;
  chatText: string;
}

const ChatContent = (props: ChatContentProps) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [chatInfo, setChatInfo] = useState({} as Chat);
  const [user, setUser] = useState("" as string);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(urls.getMessages, {
          headers,
          params: { chatID: props.chatID },
        });
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchInfo = async () => {
      try {
        const response = await axios.get(urls.getChatInfo, {
          headers,
          params: { chatID: props.chatID },
        });
        setChatInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUsername = async () => {
      try {
        const response = await axios.get(urls.user_profile, { headers });
        setUser(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();
    fetchInfo();
    fetchChats();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {chatInfo.name}
            <Typography
              variant="subtitle2"
              sx={{
                position: "absolute",
                margin: "-4px",
                padding: "0px 5px",
                color: "#cccccc",
              }}
            >
              {chatInfo.chatText}
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <ChatMessages messages={messages} user={user} />
      <ChatSend />
    </Box>
  );
};

export default ChatContent;
