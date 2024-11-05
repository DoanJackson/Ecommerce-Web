import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, TextField } from "@mui/material";
import SelectAddress from "./FormSelect";
import { getDataLocal } from "../user/GetDataLocal";
import { checkEmptyValue } from "../checkData/CheckData";
import { notifyError, notifySuccess } from "../notify/notify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useState } from "react";
import { formBuyActions } from "../store/form_submit_buy";
import { url } from "../Login/AuthContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBuy() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const good = useSelector((state) => state.showDetail);
  const data = useSelector((state) => state.formBuy);

  const [open, setOpen] = useState(false);

  function handleChangeQuantity(event) {
    dispatch(formBuyActions.setQuantity(event.target.value));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(formBuyActions.reset());
    setOpen(false);
  };

  async function buyGood(dataOrder) {
    // data = {address:{city,district},quantity:};

    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error from getting data local");
      return;
    }

    const checkEmptyData = checkEmptyValue(dataOrder);

    if (checkEmptyData) {
      const messageError = "Your data submit is missing";
      console.log(messageError);
      notifyError(messageError);
      return;
    }

    const dataGood = {
      id: good.idGood,
      ...dataOrder,
    };
    console.log(dataGood);
    try {
      //call api for adding good to cart
      const result = await axios.post(url + "/api/add_good_to_cart", dataGood, {
        headers: { Authorization: `Bearer ${localData.token}` },
      });
      //after success:
      const resData = result.data;
      if (resData.success) {
        console.log("Success adding good to cart");
        notifySuccess("Success adding good to cart");
        dispatch(formBuyActions.reset());
        navigate("/user/cart");
      } else {
        throw new Error(resData.error);
      }
    } catch (err) {
      console.log(err);
      notifyError(err.response.data.error);
    }
  }

  //delete item
  async function handleBuy() {
    handleClose();
    const dataOrder = {
      address: {
        city: data.address.city.name,
        district: data.address.district.name,
      },
      quantity: data.quantity,
    };
    buyGood(dataOrder);
  }

  return (
    <>
      <Box
        sx={{
          mx: 2,
          my: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          textalign="center"
          sx={{ width: "100%" }}
          onClick={handleClickOpen}
        >
          Buy
        </Button>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{"Verify information"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="Quantity"
            label="Quantity Buy"
            type="number"
            slotProps={{ htmlInput: { min: 1, step: 1 } }}
            fullWidth
            variant="standard"
            value={data.quantity || 0}
            onChange={handleChangeQuantity}
          />

          <SelectAddress />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleBuy}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { DialogBuy };
