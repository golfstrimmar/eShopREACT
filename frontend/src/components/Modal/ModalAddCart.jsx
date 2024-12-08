import React from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
const Modal = ({ open }) => {
  return (
    <Dialog
      open={open}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <DialogContent>
        <Typography component={"p"}>
          The product has been successfully added to the shopping cart.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
