import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Chat } from "../../../env";
import { timeAgo } from "../../../providers/useFunctions";
import ChatIcon from "./ChatIcon";

const Chats = (props: { clickChat: (id: number) => void; chats: Chat[] }) => {
  return (
    <List
      style={{
        overflowY: "scroll",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {props.chats
        .map((chat) => (
          <ListItem key={chat.chatID} disablePadding>
            <ListItemButton onClick={() => props.clickChat(chat.chatID)}>
              <ListItemAvatar>
                <ChatIcon
                  id={chat.chatID}
                  image={chat.image}
                  change={chat.changed}
                />
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
                    ></Typography>
                    {timeAgo(chat.lastInteraction)}
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};

export default Chats;
