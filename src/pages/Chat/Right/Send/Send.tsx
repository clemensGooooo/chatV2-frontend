import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Send, AttachFile, Photo } from "@mui/icons-material";
import axios from "axios";
import { headers, urls } from "../../../../env";
import { useTheme } from "@mui/material";
import Emoji from "./Emoji";

const ChatSend = (props: { chatID: number; sended: () => void }) => {
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const send = (value: string, chatID: number) => {
    if (value === "") {
      return;
    }
    try {
      axios.post(
        urls.sendMessage,
        {
          message: value,
          type: "text",
          chatID: chatID,
        },
        { headers }
      );
      props.sended();
      setMessage("");
    } catch (error) {
      //
    }
  };

  return (
    <Paper
      style={{
        padding: "10px",
        display: "flex",
        borderRadius: "0px",
        borderBottomRightRadius: "30px",
        borderTop: "1px solid " + theme.palette.divider,
        boxShadow: "none",
      }}
      elevation={3}
    >
      <Emoji setEmoji={(emoji) => setMessage((recent) => recent + emoji)} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Your chat message"
        inputProps={{ "aria-label": "chat message" }}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") send(message, props.chatID);
        }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="image"
        onClick={(e) => send(message, props.chatID)}
      >
        {message === "" ? <AttachFile /> : <Send />}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <Photo />
      </IconButton>
    </Paper>
  );
};

export default ChatSend;
