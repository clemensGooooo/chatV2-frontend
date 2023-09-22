import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import "./upload.css";

interface PageProps {
  change: (file: File[] | null) => void;
  uploadedFiles: File[];
}

const Page: React.FC<PageProps> = ({ change, uploadedFiles }) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(0);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    if (uploadedFiles.length > 1) {
      const newFiles = [...uploadedFiles];
      newFiles.splice(page, 1);
      change(newFiles);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      change([...uploadedFiles, ...fileList]);
    }
  };


  useEffect(() => {
    // Reset the page to 0 when uploadedFiles changes
    setPage(0);
  }, [uploadedFiles]);

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        position: "relative",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            textAlign: "left",
            margin: "0px",
          }}
        >
          <IconButton onClick={() => change(null)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            maxHeight: "100%",
            overflowX: "scroll",
          }}
        >
          <img
            className="image"
            src={URL.createObjectURL(uploadedFiles[page])}
            alt="Uploaded"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: theme.spacing(2),
            }}
          >
            <Pagination
              count={uploadedFiles.length}
              page={page + 1}
              onChange={(e, p) => {
                setPage(p - 1);
              }}
            />
            <input
              type="file"
              multiple
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {uploadedFiles.length > 1 && (
              <Button
                variant="contained"
                sx={{
                  position: "absolute",
                  left: "10px",
                  bottom: "10px",
                }}
                onClick={handleRemove}
              >
                Delete image
              </Button>
            )}
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
              onClick={handleButtonClick}
            >
              Add image
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Page;
