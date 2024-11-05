import { getDataLocal } from "./GetDataLocal";
import {
  Card,
  CardContent,
  Grid2,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { url } from "../Login/AuthContext";
import { useDispatch } from "react-redux";
import { userInforActions } from "../store/user_infor_slice";
function ChangeToMerchant() {
  const dispatch = useDispatch();

  async function changeRole() {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error from retriving data local in change to merchant");
      return;
    }

    try {
      await axios
        .post(
          url + "/api/user/changeToMerchant",
          {},
          {
            headers: {
              Authorization: `Bearer ${localData.token}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          console.log(result.message);
          if (result.success) {
            dispatch(userInforActions.changeRole("merchant"));
            console.log("success");
          } else {
            console.log("failed");
          }
        })
        .catch((err) => {
          console.log(
            "Error from retrieving api /api/user/changeToMerchant, error: ",
            err
          );
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Grid2 container mt={5}>
        <Grid2 size={{ xs: 1 }}></Grid2>
        <Grid2 size={{ xs: 10 }}>
          <Card variant="outlined">
            <CardContent align="center">
              <Typography variant="h3">You are not a merchant</Typography>
              <Button
                variant="contained"
                startIcon={
                  <Avatar src="https://cdn-icons-png.flaticon.com/512/4942/4942082.png" />
                }
                sx={{
                  mt: 3,
                }}
                onClick={changeRole}
              >
                Change to merchant
              </Button>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 1 }}></Grid2>
      </Grid2>
    </>
  );
}
export default ChangeToMerchant;
