import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  SxProps,
  Theme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Messages } from "../../components/Dashboard/MessagesButton";
import { ThemeSelecter } from "../../components/Dashboard/ThemeButton";
import { app_text } from "../../env";

const style = {
  margin: "0px 10px",
};

const styleAppBar: SxProps<Theme> = {
  width: `calc(100% - ${240}px)`,
  ml: `240px`,
};

export const Bar = (props: { isAdmin: boolean }) => {
  return (
    <AppBar position="fixed" sx={props.isAdmin ? styleAppBar : undefined}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {app_text.name}
        </Typography>
        <div style={style}>
          <ThemeSelecter />
        </div>
        <div style={style}>
          <Messages />
        </div>
        <Link
          to="/dashboard/account"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Button color="inherit">account</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
