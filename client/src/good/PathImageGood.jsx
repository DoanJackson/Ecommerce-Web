import axios from "axios";
import { url } from "../Login/AuthContext";
import { getDataLocal } from "../user/GetDataLocal";

async function getPathImageGood(id_good) {
  const dataLocal = getDataLocal();
  if (dataLocal === undefined) {
    console.log("Error from getting data local");
    return { success: false, error: "Fail getting data local" };
  }

  try {
    const res = await axios.post(
      url + "/api/good_data",
      { id: id_good },
      {
        headers: {
          Authorization: `Bearer ${dataLocal.token}`,
        },
      }
    );
    const result = res.data;
    return { success: true, arrayURLImage: result.result };
  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
}

export { getPathImageGood };
