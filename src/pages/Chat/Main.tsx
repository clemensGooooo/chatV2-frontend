import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { urls, headers } from "../../env";
import { timeAgo } from "../../providers/useFunctions";
import ChatContent from "./ChatContent";

interface Chat {
  name: string;
  chatID: number;
  chatText: string;
  lastInteraction: string;
}

const Main = () => {
  const [chats, setChats] = useState([] as Chat[]);
  const [chatSelected, setChatSelected] = useState(
    undefined as undefined | number
  );

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(urls.getChats, { headers });
        setChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div
      style={{
        maxWidth: 1400,
        display: "flex",
        flex: 1,
        height: "85vh",
        padding: "20px",
        margin: "auto",
        paddingBottom: "0px",
        marginTop: "10px",
        marginBottom: "-15px"
      }}
    >
      <Paper
        style={{ width: "30%", borderRight: "1px solid #ccc" }}
        elevation={3}
      >
        <Typography variant="h4" style={{ margin: 10 }}>
          Chats
        </Typography>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.chatID} disablePadding>
              <ListItemButton onClick={() => setChatSelected(chat.chatID)}>
                <ListItemAvatar>
                  <Avatar alt="Chat" />
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {chat.chatText}
                      </Typography>
                      {" - " + timeAgo(chat.lastInteraction)}
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper style={{ flex: 1}} elevation={3}>
        {chatSelected == undefined ? (
          <Typography
            variant="h2"
            style={{
              textAlign: "center",
            }}
          >
            Welcome !
          </Typography>
        ) : (
          <ChatContent chatID={chatSelected} />
        )}
      </Paper>
    </div>
  );
};

export default Main;
