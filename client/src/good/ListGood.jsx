import { Box, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";
import { url } from "../Login/AuthContext.jsx";
import { getDataLocal } from "../user/GetDataLocal.jsx";
import { useEffect, useState } from "react";
import { GoodItem } from "./ShowGood.jsx";
import { removeItem } from "./RemoveGood.jsx";
import { Overlay } from "../Loading/LoadingPage.jsx";
import { removeFileCloud } from "../../push_file_to_cloud/removeImageFromCloud.js";
import { getListFilePathImage } from "../../getDataImage/GetDataImage.js";
import { notifyError, notifySuccess } from "../user/Notification.jsx";

function ListGood() {
  const [numberPage, setNumberPage] = useState(1); //default of maximum page is 1
  const [pageCurrent, setPageCurrent] = useState(1); //default of page current is 1
  const [arrayGood, setArrayGood] = useState([]);
  const [loading, setLoading] = useState(false);
  const numberPerPage = 8;

  //get number page
  async function getNumberPage() {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error from getting local data");
      return;
    }

    await axios
      .get(url + "/api/user/get_number_good", {
        headers: {
          Authorization: `Bearer ${localData.token}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.success) {
          const numberGood = result.number_good;
          const numPage = Math.ceil(numberGood / numberPerPage);
          setNumberPage(numPage);
          console.log(numPage);
        } else {
          console.log("Error from get number of good");
        }
      })
      .catch((err) => {
        console.log("Error from use api get number good: ", err);
      });
  }

  async function getArrayGood(currentPage) {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error from getting local data");
      return;
    }

    await axios
      .get(
        url +
          `/api/user/good_merchant?page=${currentPage}&limit=${numberPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localData.token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.res;
        setArrayGood(data);
      })
      .catch((err) => {
        console.log(
          "Error from get data of good of page ",
          currentPage,
          ", error: ",
          err
        );
      });
  }

  async function handleDeleteGoodItem(id) {
    try {
      setLoading(true);

      // Retrieve list of file paths associated with the good
      const resImageGood = await getListFilePathImage(id);
      if (resImageGood.success) {
        // Use `Promise.all` to delete all files in the cloud
        const promises = resImageGood.result.map(async (item) => {
          return await removeFileCloud(item.filedirectory);
        });
        await Promise.all(promises);
      } else {
        console.error(
          "Error from retrive all image of good, err: ",
          resImageGood.error
        );
        throw new Error(
          "Error from retrive all image of good, err: ",
          resImageGood.error
        );
      }

      const result = await removeItem(id);
      console.log("ket qua ne: ", result);
      if (!result) throw new Error("Failed to remove item");

      //get number of pages
      await getNumberPage();

      //get the array of goods (set default page is the first page)
      await getArrayGood(1);
      notifySuccess("Remove good success");
    } catch (err) {
      console.log("Error during deletion flow: ", err);
      notifyError("Error from removing good");
    } finally {
      setLoading(false);
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
      {/* Loading state */}
      {loading && <Overlay />}

      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ mb: 2 }}
            color="#0B4F6C"
          >
            Goods of your store
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
              <GoodItem
                key={index}
                data={item}
                type="good_merchant"
                deleteItem={handleDeleteGoodItem}
              />
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
export { ListGood };
