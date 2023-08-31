import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  List,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { green } from "@mui/material/colors";

const NewChatButton = (props: { openNewChat: () => void }) => {
  return (
    <div style={{ bottom: "0", width: "100%" }}>
      <List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => props.openNewChat()}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: green[500] }}>
                <AddCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Create new chat"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};
export default NewChatButton;
