import { Box, Button, Grid2, Rating, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import CarouselImage from "./CarouselImage.jsx";
import DetailItem from "./DetailItem";
import { useEffect, useState } from "react";
import { getPathImageGood } from "./PathImageGood";
import { getDetailGood } from "./GetDataGood.jsx";
import DialogBuy from "../Dialog/DialogBuyItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { showDetailActions } from "../store/select_good_slice.js";

//component for getDetail of good
function GoodDetailComponent() {
  const dispatch = useDispatch();

  const good = useSelector((state) => state.showDetail);
  const [data, setData] = useState(null);
  const [arrayImage, setArrayImage] = useState(null);

  async function getURLImage() {
    const res = await getPathImageGood(good.idGood);
    if (res.success) {
      setArrayImage(res.arrayURLImage);
    } else {
      console.log("Error: ", res.error);
    }
  }

  async function getDataGood() {
    const res = await getDetailGood(good.idGood);
    if (res.success) {
      setData(res.detail);
    } else {
      console.log(res.error);
    }
  }

  function cancle() {
    dispatch(showDetailActions.unShow());
  }
  //chua xong

  useEffect(() => {
    const fetchData = async () => {
      await getURLImage();
      await getDataGood();
    };
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }} my={3}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, lg: 7 }} ml={2} mr={2}>
            {arrayImage !== null && <CarouselImage listImage={arrayImage} />}
          </Grid2>
          <Grid2
            size={{ xs: 12, lg: 4 }}
            ml={2}
            mr={2}
            sx={{ mt: { xs: 0, lg: 5 } }}
          >
            {data !== null && (
              <>
                <DetailItem label="Name" value={data.name} />
                <Box
                  sx={{
                    mx: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    mr={1}
                    sx={{ textTransform: "capitalize", width: "120px" }}
                  >
                    Rating:
                  </Typography>
                  <Rating name="read-only" value={5} readOnly />
                </Box>
                <DetailItem label="Type" value={data.type} />
                <DetailItem label="Cost" value={`${data.cost} $`} />
                <DetailItem label="Number sold" value={data.numbersold} />
                <DetailItem label="Quantity" value={data.quantity} />
              </>
            )}
            <DialogBuy />
          </Grid2>
        </Grid2>
      </Box>
      <hr />
      <Box display={"flex"} justifyContent={"center"}>
        <Button variant="outlined" onClick={cancle}>
          Return Shopping Page
        </Button>
      </Box>
      <Outlet />
    </>
  );
}
export default GoodDetailComponent;
