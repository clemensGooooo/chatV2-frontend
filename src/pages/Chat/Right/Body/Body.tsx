import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { headers, urls } from "../../../../env";
import { ChatLarge } from "../ChatFormats";
import ChatHeader from "../ChatHeader";
import ChatInfo from "../ChatInfo/Index";
import ChatMessages from "./ChatMessages";

interface ChatContentProps {
  chatID: number;
  majorChange: (id: number) => void;
}

const ChatContent = (props: ChatContentProps) => {
  const [chatInfo, setChatInfo] = useState({} as ChatLarge);
  const [mode, setMode] = useState(0); // 0 main chat - 1 chat info

  useEffect(() => {
    setMode(0);

    const fetchInfo = async () => {
      try {
        const response = await axios.get(urls.getChatInfo, {
          headers,
          params: { chatID: props.chatID },
        });
        setChatInfo(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchInfo();
  }, [props.chatID]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ChatHeader chat={chatInfo} clickInfo={() => setMode(1)} />
      <ChatMessages chatID={props.chatID} />
      {mode == 0 ? (
        <></>
      ) : (
        <ChatInfo
          chat={chatInfo}
          back={() => setMode(0)}
          majorChange={(id) => {
            if (id == 0) {
              setMode(0);
            }
            props.majorChange(id);
          }}
        />
      )}
    </Box>
  );
};

export default ChatContent;
