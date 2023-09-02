import { Button } from "@mui/material";
import axios from "axios";
import { headers, urls } from "../../../../env";

const Delete = (props: {
  chatID: number;
  majorChange: (id: number) => void;
}) => {
  const deleteChat = () => {
    axios.delete(urls.deleteChat, {
      headers,
      params: {
        chatID: props.chatID,
      },
    });
    props.majorChange(0);
  };
  return (
    <div>
      <Button fullWidth variant="outlined" color="error" onClick={deleteChat}>
        DELETE CHAT
      </Button>
    </div>
  );
};

export default Delete;
