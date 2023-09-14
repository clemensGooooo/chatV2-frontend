import { Avatar, Paper, Typography } from "@mui/material";
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
        position: "sticky",
        bottom: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px red solid",
      }}
      elevation={3}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            maxWidth: { xs: "100%", sm: "100%" }
          }}
        >
          <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            scrollButtons
            allowScrollButtonsMobile
          >
            {emojis.map((category) => (
              <Tab label={category.name} />
            ))}
          </Tabs>
        </Box>
        {emojis.map((category, i) => (
          <CustomTabPanel value={value} index={i}>
            {category.icon.map((ico) => (
              <p className="emoji" onClick={() => handleEmojiClick(ico)}>
                {ico}
              </p>
            ))}
          </CustomTabPanel>
        ))}
      </Box>
    </Paper>
  );
};

export default Emoji;
