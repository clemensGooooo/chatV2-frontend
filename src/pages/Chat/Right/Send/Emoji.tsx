import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { emojis } from "../../../../static/emoji";
import { useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React from "react";
import "./emoji.css";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{
        height: "20vh",
        width: "100%",
        overflowY: "scroll",
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Emoji = (props: { setEmoji: (e: string) => void }) => {
  const [value, setValue] = React.useState(0);
  const [currentPage, setPage] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleEmojiClick = (emoji: string) => {
    props.setEmoji(emoji);
  };
  return (
    <Paper
      sx={{
        flex: 1,
        position: "relative",
      }}
      elevation={1}
    >
      <Box
        sx={{
          overflowX: "scroll",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {emojis.map((category, i) => (
          <div
            key={i}
            onClick={() => setPage(i)}
            className="tab"
            style={{
              borderBottom: theme.palette.divider + " 2px solid",
            }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main }}
              component="div"
            >
              {category.name}
            </Avatar>
          </div>
        ))}
      </Box>
      <Box
        sx={{
          padding: "10px",
          width: "100%",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {emojis[currentPage].icon.map((ico, i) => (
          <p key={i} className="emoji" onClick={() => handleEmojiClick(ico)}>
            {ico}
          </p>
        ))}
      </Box>
    </Paper>
  );
};

export default Emoji;
