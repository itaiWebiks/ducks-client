import React from "react";
import Snackbar from "@mui/material/Snackbar";

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  vertical: string;
  horizontal: string;
  message:string;
}

const SnackbarComponent: React.FC<SnackbarProps> = ({
  open,
  onClose,
  vertical,
  horizontal,
  message
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={() => onClose()}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default SnackbarComponent;
