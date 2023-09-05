import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditProfileImage from "./EditProfileImage";
import { ChatLarge } from "../ChatContent";
import { Name, Description } from "./EditableField";
import "./Styles.css";
import Delete from "./DeleteChat";

interface ChatInfoProps {
  chat: ChatLarge;
  back: () => void;
  majorChange: (id: number) => void;
}

const ChatInfo: React.FC<ChatInfoProps> = ({ chat, back, majorChange }) => {
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
  const theme = useTheme();

  const styles = {
    paper: {
      zindex: 1,
      overflow: "scroll",
      width: "100%",
      position: "absolute",
      display: "block",
      borderBottomRightRadius: "30px",
      borderTopRightRadius: "30px",
      textAlign: "left",
      height: "100%",
      left: isOpen ? "0%" : "100%",
      transition: "left 0.5s ease-in-out",
      boxShadow: "none",
      backgroundColor: theme.palette.background.paper,
    },
    closeButton: {
      display: "block",
      position: "absolute",
      right: "10px",
    },
    box: {
      padding: "30px",
      margin: "10px",
      marginTop: "20px",
      borderLeft: "2px solid " + theme.palette.primary.main,
      borderTop: "2px solid " + theme.palette.primary.main,
    },
    box2: {
      padding: "30px",
      paddingBottom: "0px",
      margin: "10px",
    },
    body: {
      padding: "10px",
    },
  };
  return (
    <Paper elevation={2} sx={styles.paper}>
      <AppBar
        position="static"
        sx={{
          borderTopRightRadius: "30px",
          boxShadow: "none",
        }}
        color={"secondary"}
      >
        <Toolbar>
          <Typography variant="h5">Edit the chat</Typography>
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
        <Box sx={styles.box2}>
          <Delete chatID={chat.chatID} majorChange={majorChange} />
        </Box>
      </div>
    </Paper>
  );
};

export default ChatInfo;
