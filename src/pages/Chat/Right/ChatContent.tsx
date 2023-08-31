import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { headers, urls } from "../../../env";
import ChatHeader from "./ChatHeader";
import ChatInfo from "./ChatInfo";
import ChatMessages from "./ChatMessages";
import ChatSend from "./ChatSend";

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

export interface ChatLarge {
  chatID: number;
  name: string;
  members: string[];
  lastInteraction: string;
  chatText: string;
  image: boolean;
}

const ChatContent = (props: ChatContentProps) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [chatInfo, setChatInfo] = useState({} as ChatLarge);
  const [mode, setMode] = useState(0); // 0 main chat - 1 chat info
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
  }, [props.chatID]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {mode == 0 ? (
        <>
          <ChatHeader chatInfo={chatInfo} clickInfo={() => setMode(1)} />
          <ChatMessages messages={messages} user={user} />
          <ChatSend chatID={chatInfo.chatID} />
        </>
      ) : (
        <ChatInfo chat={chatInfo} back={() => setMode(0)} />
      )}
    </Box>
  );
};

export default ChatContent;
