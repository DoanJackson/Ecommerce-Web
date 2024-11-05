import axios from "axios";
import { url } from "../Login/AuthContext.jsx";
import { getDataLocal } from "../user/GetDataLocal.jsx";

async function getArrayGoodUser(data) {
  const localData = getDataLocal();
  if (localData === undefined) {
    console.log("Error from getting local data");
    return { success: false, error: "Error from getting local data" };
  }

  const { currentPage, numberPerPage } = data;

  try {
    const res = await axios.get(
      url +
        `/api/all_good_information?page=${currentPage}&limit=${numberPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${localData.token}`,
        },
      }
    );
    const result = res.data.res;
    return { success: true, arrayGood: result };
  } catch (err) {
    console.log(
      "Error from get data of good of page ",
      currentPage,
      ", error: ",
      err
    );
    return {
      success: false,
      error: `Error from get data of good of page ${currentPage}, err: ${err}`,
    };
  }
}

export { getArrayGoodUser };
