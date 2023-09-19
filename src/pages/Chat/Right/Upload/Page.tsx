import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface PageProps {
  change: () => void;
  uploadedFile: File | null;
}

const Page: React.FC<PageProps> = ({ change: majorChange, uploadedFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const theme = useTheme();

  if (uploadedFile == null) return <></>;
  return (
    <Paper
      elevation={2}
      style={{
        flex: 1,
        position: "relative",
        height: "100%"
      }}
    >
      <Box
        sx={{
          padding: "10px",
          width: "100%",
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        <img
          style={{
            width: "100%",
          }}
          src={URL.createObjectURL(uploadedFile)}
          alt="Uploaded"
        />{" "}
        <img
          style={{
            width: "100%",
          }}
          src={URL.createObjectURL(uploadedFile)}
          alt="Uploaded"
        />{" "}
        <img
          style={{
            width: "100%",
          }}
          src={URL.createObjectURL(uploadedFile)}
          alt="Uploaded"
        />
      </Box>
      <Button onClick={() => {}}>Send</Button>
    </Paper>
  );
};

export default Page;
