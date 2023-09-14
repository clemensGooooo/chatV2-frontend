import { AttachFile } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef, ChangeEvent } from "react";


const File = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      //
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IconButton onClick={handleButtonClick} component="span">
        <AttachFile />
      </IconButton>
    </>
  );
};

export default File;
