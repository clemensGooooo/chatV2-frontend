import React, { useState, useEffect, ChangeEvent } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import NewChatImage from "../../../components/Chat/NewChatImage";
import { headers, urls } from "../../../env";
import "./roundedButton.css";

interface EditProfileImageProps {
  chatID: number;
  majorChange: (chatID: number) => void;
}

interface ImageStyles {
  [key: string]: React.CSSProperties;
}

const styles: ImageStyles = {
  root: {
    margin: "auto",
    marginTop: "20px",
    width: "50%",
  },
  uploadImageContainer: {
    margin: "auto",
    width: "100%",
    cursor: "pointer",
    paddingBottom: "100%",
    position: "relative",
    borderRadius: "100%",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  errorMessage: {
    color: "red",
  },
  button: {
    margin: "10px",
  },
};

const EditProfileImage: React.FC<EditProfileImageProps> = (props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorImage, setErrorImage] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [successUpload, setSuccessUpload] = useState<boolean>(false);
  const maxFileSize = 6 * 1024 * 1024;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.size <= maxFileSize) {
        setSelectedImage(selectedFile);
        setErrorImage("");
      } else {
        setSelectedImage(null);
        setErrorImage("File size exceeds the maximum limit of 6 MB.");
      }
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("chatID", String(props.chatID));

    try {
      const response = await axios.post(urls.uploadGroupImage, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      setTimeout(() => {
        setSelectedImage(null);
        setSuccessUpload(!successUpload);
        props.majorChange(props.chatID);
      }, 300);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(urls.getProfile + "/" + props.chatID, {
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
      } catch (error) {}
    };

    fetchImage();
  }, [successUpload, props.chatID]);

  return (
    <Box style={styles.root}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="image-upload"
      />
      {selectedImage === null ? (
        <label htmlFor="image-upload">
          {imageSrc !== "" ? (
            <div
              style={{
                ...styles.uploadImageContainer,
                backgroundImage: `url(${imageSrc})`,
              }}
            ></div>
          ) : (
            <Button
              component="span"
              className="round-button"
              variant="outlined"
            >
              Add Profile image
            </Button>
          )}
          {errorImage !== "" && (
            <Typography style={styles.errorMessage}>{errorImage}</Typography>
          )}
        </label>
      ) : (
        <Box style={{ marginTop: "10px", cursor: "pointer" }}>
          <label htmlFor="image-upload">
            <NewChatImage url={URL.createObjectURL(selectedImage)} />
          </label>
          <Button style={styles.button} onClick={uploadImage}>
            Apply image change
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EditProfileImage;
