import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChatLarge } from "./ChatContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { urls, headers } from "../../../env";
import { Description, Name } from "./EditableField";
import CloseIcon from "@mui/icons-material/Close";
import ChatProfileImage from "./ChatProfileImage";
import AddProfileImage from "./AddProfileImage";

const ChatInfo = (props: { chat: ChatLarge; back: () => void }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        padding: "10px",
        textAlign: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="close"
        sx={{
          display: "block",
          position: "absolute",
          right: "10px",
        }}
        onClick={props.back}
      >
        <CloseIcon />
      </IconButton>
      {props.chat.image ? (
        <ChatProfileImage chatID={props.chat.chatID} />
      ) : (
        <AddProfileImage />
      )}
      <Box
        sx={{
          padding: "40px",
        }}
      >
        <Name name={props.chat.name} chatID={props.chat.chatID} />
        <Description
          description={props.chat.chatText}
          chatID={props.chat.chatID}
        />
      </Box>
    </Paper>
  );
};
export default ChatInfo;
