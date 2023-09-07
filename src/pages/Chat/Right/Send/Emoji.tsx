import { InsertEmoticon } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { emojis } from "../../../../static/emoji";
import "./emoji.css"


const Emoji = (props: { setEmoji: (e: string) => void }) => {
  const [tab, setTab] = useState(0 as number);
  const [open, setOpen] = useState(null as null | HTMLElement);

  const handleEmojiClick = (emoji: string) => {
    props.setEmoji(emoji);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        sx={{ p: "10px" }}
        aria-label="emoji"
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <InsertEmoticon />
      </IconButton>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <div id="emojiSection">
          
          {emojis.map((emoji, i) => (
            <div key={emoji.name}>
              {emoji.name === emojis[tab].name ? (
                <h5 className="active">{emoji.name}</h5>
              ) : (
                <h6 onClick={() => setTab(i)}>{emoji.name}</h6>
              )}
            </div>
          ))}

          <br />
          <br />

          {emojis[tab].icon.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/).map((emoji: string, index: number) => (
            <a key={index} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </a>
          ))}
        </div>
      </Menu>
    </>
  );
};

export default Emoji;
