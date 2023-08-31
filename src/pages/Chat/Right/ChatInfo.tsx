import React, { useEffect, useState } from "react";
import { AppBar, Box, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditProfileImage from "./EditProfileImage";
import { ChatLarge } from "./ChatContent";
import { Name, Description } from "./EditableField";

interface ChatInfoProps {
  chat: ChatLarge;
  back: () => void;
  majorChange: (id: number) => void;
}

const ChatInfo: React.FC<ChatInfoProps> = ({ chat, back,majorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleBack = () => {
    setIsOpen(false);
    setTimeout(() => {
      back();
    }, 500);
  };

  const styles = {
    paper: {
      zindex: 1,
      width: "100%",
      position: "absolute",
      borderTopLeftRadius: "0px",
      borderTopRightRadius: "0px",
      textAlign: "center",
      height: "100%",
      left: isOpen ? "0%" : "100%",
      transition: "left 0.5s ease-in-out",
    },
    closeButton: {
      display: "block",
      position: "absolute",
      right: "10px",
    },
    box: {
      padding: "40px",
    },
    body: {
      padding: "10px",
      background: "rgba(0, 0, 0, 0.05)",
      height: "100%"
    },
  };
  return (
    <Paper elevation={5} sx={styles.paper}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5">
            Edit the chat
          </Typography>
          <IconButton
            aria-label="close"
            sx={styles.closeButton}
            onClick={handleBack}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={styles.body}>
        <EditProfileImage chatID={chat.chatID} majorChange={majorChange} />

        <Box sx={styles.box}>
          <Name name={chat.name} chatID={chat.chatID} />
          <Description description={chat.chatText} chatID={chat.chatID} />
        </Box>
      </div>
    </Paper>
  );
};

export default ChatInfo;
