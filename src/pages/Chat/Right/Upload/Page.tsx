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
  back: () => void;
  change: () => void;
  uploadedFile: File | null;
}

const Page: React.FC<PageProps> = ({
  back,
  change: majorChange,
  uploadedFile,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleBack = () => {
    setIsOpen(false);
    setTimeout(() => {
      back();
    }, 500);
  };

  const theme = useTheme();

  const styles = {
    paper: {
      zindex: 1,
      overflow: "scroll",
      width: "100%",
      position: "absolute",
      display: "block",
      borderBottomRightRadius: "30px",
      borderTopRightRadius: "30px",
      textAlign: "left",
      height: "100%",
      left: isOpen ? "0%" : "100%",
      transition: "left 0.5s ease-in-out",
      boxShadow: "none",
      borderTopLeftRadius: "0px",
      backgroundColor: theme.palette.background.paper,
    },
    body: {
      padding: "10px",
    },
    closeButton: {
      display: "block",
      position: "absolute",
      right: "10px",
    },
  };

  if (uploadedFile == null) return <></>;
  return (
    <Paper elevation={2} sx={styles.paper}>
      <AppBar
        position="static"
        sx={{
          borderTopRightRadius: "30px",
          boxShadow: "none",
        }}
        color={"secondary"}
      >
        <Toolbar>
          <Typography variant="h5">Send a image</Typography>
          <IconButton
            aria-label="close"
            sx={styles.closeButton}
            onClick={handleBack}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box>
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
