import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const AdminBar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h5">
          <strong>Admin Panel</strong>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link
            to="/dashboard/news-article"
            style={{
              color: "inherit",
              textDecoration: "none",
              width: "100%",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary={"News articles"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/dashboard/users"
            style={{
              color: "inherit",
              textDecoration: "none",
              width: "100%",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Show all users"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default AdminBar;