import axios from "axios";
import { getDataLocal } from "../user/GetDataLocal.jsx";
import { url } from "../Login/AuthContext.jsx";

async function getNumberPageAllGood(data) {
  const numberPerPage = data;

  const localData = getDataLocal();
  if (localData === undefined) {
    console.log("Error from getting local data");
    return;
  }

  try {
    const res = await axios.get(url + "/api/get_all_good", {
      headers: {
        Authorization: `Bearer ${localData.token}`,
      },
    });
    const result = res.data;
    if (result.success) {
      const numberGood = result.number_good;
      const numPage = Math.ceil(numberGood / numberPerPage);
      return { success: true, numberPage: numPage };
    } else {
      console.log("Error from get number of all good in website");
      return {
        success: false,
        error: `Error from get number good, err: ${result.message}`,
      };
    }
  } catch (err) {
    console.log("Error from use api get number good: ", err);
    return { success: false, error: err };
  }
}

export { getNumberPageAllGood };
