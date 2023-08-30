import axios from "axios";
import { useEffect, useState } from "react";
import { headers, urls } from "../../env";

const Image = (props: { id: string }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(urls.chatImages + "/" + props.id, {
          headers,
          responseType: "blob"
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

    fetchImage();
  }, [props.id]);

  return (
      <img src={imageSrc} alt="Image" width={"100%"} style={{alignSelf: "flex-end"}} />
  );
};

export default Image;
