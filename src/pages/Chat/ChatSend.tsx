import { Paper, TextField, Button, IconButton } from "@mui/material";
import { useState } from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const ChatSend = () => {
  const [message, setMessage] = useState("");
  return (
    <Paper style={{ padding: "10px", display: "flex" }}>
      <IconButton>
        <InsertDriveFileIcon />
      </IconButton>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Message"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={() => {}}>
        Send
      </Button>
    </Paper>
  );
};

export default ChatSend;
