import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getNumberPageAllGood } from "./getNumberPageGood.jsx";
import { getArrayGoodUser } from "./getInformationPageGood.jsx";
import { GoodItem } from "../good/ShowGood.jsx";

function ShoppingComponent() {
  const [numberPage, setNumberPage] = useState(1); //default of maximum page is 1
  const [pageCurrent, setPageCurrent] = useState(1); //default of page current is 1
  const [arrayGood, setArrayGood] = useState([]);

  const numberPerPage = 8;

  //get number page
  async function getNumberPage() {
    const result = await getNumberPageAllGood(numberPerPage);
    if (result.success) {
      setNumberPage(result.numberPage);
    } else {
      console.log(
        "Error from get number of page with shopping component, err: ",
        result.error
      );
    }
  }

  //get data of good from page i and limit perpage is numberPerPage
  async function getArrayGood(currentPage) {
    const result = await getArrayGoodUser({
      currentPage: currentPage,
      numberPerPage: numberPerPage,
    });
    if (result.success) {
      setArrayGood(result.arrayGood);
    } else {
      console.log("Error from getting data of page, err: ", result.error);
    }
  }

  async function handleChangePage(event, page) {
    setPageCurrent(page);
    await getArrayGood(page);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getNumberPage();
      await getArrayGood(1);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: "1rem" }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ mb: 2 }}
            color="#0B4F6C"
          >
            All goods in website
          </Typography>
          <Stack
            spacing={{ xs: 4, sm: 3 }}
            direction="row"
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {arrayGood.map((item, index) => (
              <GoodItem key={index} data={item} type="user_normal" />
            ))}
          </Stack>
        </Box>
        <Stack
          spacing={3}
          direction="row"
          sx={{ my: 3, justifyContent: "center" }}
        >
          <Pagination
            count={numberPage}
            defaultPage={1}
            size="large"
            color="primary"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </>
  );
}
export default ShoppingComponent;
