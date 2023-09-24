import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { ChangeEvent, useState } from "react";
import { Send, Photo, TurnLeft } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import Emoji from "./Emoji";
import File from "./FileSend";
import Requests from "../../../../services/requests";
import { InsertEmoticon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Message } from "../ChatFormats";
import Page from "./Upload/Page";

const ChatSend = (props: {
  chatID: number;
  sended: (data: Message) => void;
}) => {
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const [openEmoji, setOpenEmoji] = useState(false as Boolean);
  const [uploadedFile, setUploadedFile] = useState<File[] | null>(null);

  const handleFileUpload = (file: File[] | null) => {
    setUploadedFile(file);
    if (file != null) {
      setOpenEmoji(false);
    }
  };

  const handleChange = () => {
    setOpenEmoji(!openEmoji);
  };

  const send = async (
    e?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e && e.key === "Enter") || e == undefined) {
      let messageSend = await Requests.send(
        message,
        props.chatID,
        uploadedFile != null ? uploadedFile : undefined
      );
      props.sended(messageSend);
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {uploadedFile && uploadedFile.length != 0 ? (
        <Page
          change={(files) => setUploadedFile(files)}
          uploadedFiles={uploadedFile}
        />
      ) : (
        <></>
      )}

      {openEmoji ? (
        <Emoji setEmoji={(emoji) => setMessage((recent) => recent + emoji)} />
      ) : (
        <></>
      )}

      <Paper
        style={{
          padding: "10px 10px 10px 10px",
          display: "flex",
          borderRadius: "0px",
          borderBottomRightRadius: "30px",
          borderTop: "1px solid " + theme.palette.divider,
          boxShadow: "none",
        }}
        elevation={3}
      >
        <IconButton
          sx={{ p: "10px" }}
          onClick={handleChange}
          aria-controls={openEmoji ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openEmoji ? "true" : undefined}
          aria-label="menu"
        >
          {openEmoji ? <CloseIcon /> : <InsertEmoticon />}
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "large" }}
          placeholder="Your chat message"
          inputProps={{ "aria-label": "chat message" }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => send(e)}
        />

        {message != "" || uploadedFile ? (
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="image"
            onClick={() => send()}
          >
            <Send />
          </IconButton>
        ) : (
          <File variant={0} onFileUpload={handleFileUpload} />
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <File variant={1} onFileUpload={handleFileUpload} />
      </Paper>
    </Box>
  );
};

export default ChatSend;
