import React, { useState, ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface ChildComponentProps {
  children: ReactNode;
}

const MapDialog: React.FC<ChildComponentProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Map Of Ducks
      </Button>
      <Dialog
        open={open}
        PaperProps={{ style: { height: "90vh" } }}
        maxWidth="xl"
        fullWidth >
        <DialogTitle>RABBITS LOACTION MAP</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapDialog;
