import Box from "@mui/material/Box";
import { FormControl, Fab, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import axios from "axios";
import { url } from "../Login/AuthContext";
import { getDataLocal } from "./GetDataLocal";
import { useDispatch, useSelector } from "react-redux";
import { userInforActions } from "../store/user_infor_slice";
import { notifySuccess } from "../notify/notify";

function InformationUser() {
  const dataUser = useSelector((state) => state.userInfor);
  const [data, setData] = useState(dataUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(dataUser);
  }, [dataUser]);

  function handleOnChange(event) {
    setData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit() {
    const user = getDataLocal();
    if (user === undefined) {
      console.log("error from getDataLocal");
      return;
    }

    try {
      const dataUpdate = {
        name: data.name,
        age: data.age,
        address: data.address,
        telphone: data.telphone,
      };
      await axios
        .post(url + "/api/user/update-infor", dataUpdate, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((_) => {
          dispatch(userInforActions.changeData(dataUpdate));
          notifySuccess("Update information success!!!");
          console.log("Update finish");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Box
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Information
        </Typography>

        <FormControl size="medium" sx={{ width: "20em" }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={data.email || ""}
            name="email"
            size="small"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={data.name || ""}
            name="name"
            size="small"
            sx={{
              mt: 3,
            }}
            onChange={handleOnChange}
          />
          <TextField
            id="outlined-basic"
            label="Age"
            variant="outlined"
            value={data.age || ""}
            name="age"
            size="small"
            sx={{
              mt: 3,
            }}
            onChange={handleOnChange}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={data.address || ""}
            name="address"
            size="small"
            sx={{
              mt: 3,
            }}
            onChange={handleOnChange}
          />
          <TextField
            id="outlined-basic"
            label="Balance"
            variant="outlined"
            value={data.balance || ""}
            name="balance"
            size="small"
            sx={{
              mt: 3,
            }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Telephone"
            variant="outlined"
            value={data.telphone || ""}
            name="telphone"
            size="small"
            sx={{
              mt: 3,
            }}
            onChange={handleOnChange}
          />
          <Fab
            variant="extended"
            sx={{ mt: 3 }}
            type="submit"
            onClick={handleSubmit}
          >
            <BackupOutlinedIcon sx={{ mr: 1 }} />
            Submit
          </Fab>
        </FormControl>
      </Box>
    </>
  );
}
export default InformationUser;
