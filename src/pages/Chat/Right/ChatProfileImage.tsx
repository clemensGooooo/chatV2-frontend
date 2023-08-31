import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { urls, headers } from "../../../env";

const ChatProfileImage = (props: {chatID: number}) => {
  const [imageSrc, setImageSrc] = useState("" as string);
  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(
          urls.getProfile + "/" + props.chatID,
          {
            headers,
            responseType: "blob",
          }
        );

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

    fetchImage();
  }, []);
  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        paddingBottom: "50%",
        position: "relative",
        borderRadius: "100%",
        overflow: "hidden",
        backgroundImage: `url(` + imageSrc + `)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};
export default ChatProfileImage;
