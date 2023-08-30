import { Paper, Typography } from "@mui/material";
import { timeAgo } from "../../providers/useFunctions";
import { Message } from "./ChatContent";
import Image from "./Image";

const colors = [
  "red",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "magenta",
  "brown",
];


const ChatBox = (props: { message: Message,user: string }) => {
  const message = props.message;

  return (
    <Paper
      key={message._id}
      elevation={3}
      style={{
        padding: "10px",
        margin: "10px",
        maxWidth: message.type == "image" ? "40%" : "60%",
        lineBreak: "anywhere",
        alignSelf: props.user == message.user ? "flex-end" : "flex-start",
      }}
    >
      <Typography
        variant="caption"
        style={{
          color:
            message.user === props.user
              ? "inherit"
              : colors[Math.floor(Math.random() * colors.length)],
        }}
      >
        {message.user == props.user ? "Me" : message.user}
      </Typography>
      {message.type == "image" ? <Image id={message._id} /> : <></>}
      <Typography variant="body1">{message.message}</Typography>
      <Typography variant="caption" sx={{ color: "grey" }}>
        {timeAgo(message.timestamp)}
      </Typography>
    </Paper>
  );
};

export default ChatBox;