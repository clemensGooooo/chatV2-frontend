import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const LoadBefore = (props: {onClick: () => void}) => {
  return (
    <Button
      sx={{
        left: "0",
        right: 0,
        top: 20,
        position: "absolute",
        margin: "auto",
        borderRadius: "40px",
        padding: "10px 20px",
      }}
      variant="outlined"
      startIcon={<ArrowUpwardIcon />}
      onClick={props.onClick}
    >
      Load messages before
    </Button>
  );
};

export default LoadBefore;
