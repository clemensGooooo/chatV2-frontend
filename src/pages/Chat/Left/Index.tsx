import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Chat } from "../../../env";
import Chats from "./Chats";
import NewChat from "./NewChat";
import NewChatButton from "./NewChatButton";

const Left = (props: {
  chats: Chat[];
  openChat: (id: number) => void;
  width: string;
  newChat: (id: number) => void;
}) => {
  const [mode, setMode] = useState(0); // 0 -> displays all, 1 -> new Chat
  return (
    <Paper
      style={{
        width: props.width,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        margin: "0",
      }}
      elevation={4}
    >
      {mode == 0 ? (
        <>
          <Typography variant="h4" style={{ margin: 10 }}>
            Chats
          </Typography>
          <Chats
            chats={props.chats}
            clickChat={(chat) => props.openChat(chat)}
          />
          <NewChatButton openNewChat={() => setMode(1)} />
        </>
      ) : (
        <NewChat
          back={() => setMode(0)}
          newChat={(id) => {
            setMode(0);
            props.newChat(id);
          }}
        />
      )}
    </Paper>
  );
};

export default Left;
