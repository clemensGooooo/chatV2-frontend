import { AttachFile } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef, ChangeEvent, useState } from "react";
import { Photo } from "@mui/icons-material";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
  variant: 0 | 1;
}

const File: React.FC<FileUploadProps> = ({ onFileUpload, variant }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file);
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
      {variant == 0 ? (
        <IconButton onClick={handleButtonClick} component="span">
          <AttachFile />
        </IconButton>
      ) : (
        <IconButton onClick={handleButtonClick} color="primary" sx={{ p: "10px" }}>
          <Photo />
        </IconButton>
      )}
    </>
  );
};

export default File;
