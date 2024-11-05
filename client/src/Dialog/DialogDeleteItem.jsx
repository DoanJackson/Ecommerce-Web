import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDelete(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  //create a pop up inform delete item
  function removeItem() {
    handleClickOpen();
  }
  //delete item
  async function handleDeleteItem() {
    handleClose();
    await props.deleteItem();
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "50%",
        }}
        className="close_item"
        onClick={removeItem}
      >
        <CloseIcon className="close_icon" />
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you really want to delete good?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you delete this item, all information related to it will be
            removed, and we will not be responsible for it.{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteItem}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export { DialogDelete };
