import { Avatar } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { urls, headers } from "../../../env";

const ChatIcon = (props: { id: number; image: boolean }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(urls.getProfile + "/" + props.id, {
          headers,
          responseType: "blob",
        });

        if (response.status === 200) {
          const blob = response.data;
          const src = URL.createObjectURL(blob);
          setImageSrc(src);
        } else {
          console.error("Failed to fetch image");
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (props.image) fetchImage();
  }, [props.id]);

  return <Avatar alt="Chat" src={props.image ? imageSrc : undefined} />;
};

export default ChatIcon;
