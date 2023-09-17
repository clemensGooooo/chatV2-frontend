import { Paper, useTheme } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";

interface InfoMessageProps {
  text: string;
  id: string;
  user: string;
}

const InfoMessage = (props: InfoMessageProps) => {
  const theme = useTheme();
  return (
    <Paper
      key={props.id}
      elevation={3}
      style={{
        padding: "7px 10px",
        margin: "10px",
        lineBreak: "anywhere",
        textAlign: "center",
        alignSelf: "center",
        fontSize: "small",
        background:
          props.user == "none"
            ? theme.palette.secondary.main
            : theme.palette.background.paper,
        color: props.user == "none"
        ? theme.palette.secondary.contrastText: "",
      }}
    >
      {" "}
      <HttpsIcon sx={{ fontSize: "small", padding: "0px 10px" }} />
      {props.text}
    </Paper>
  );
};

export default InfoMessage;
