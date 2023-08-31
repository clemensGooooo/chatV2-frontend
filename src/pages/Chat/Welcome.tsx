import { Typography } from "@mui/material";

const Welcome = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10%",
      }}
    >
      <Typography variant="h2">Welcome</Typography>
      <Typography
        sx={{
          margin: "15%",
        }}
      >
        Welcome to our chat app, you can select the chats by clicking on them.
        If you have no chats you can create them with the button at the bottom
        namedcreat chat. If you need nothing more let's go and explore this app.
      </Typography>
    </div>
  );
};

export default Welcome;
