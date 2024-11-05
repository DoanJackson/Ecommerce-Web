import axios from "axios";
import { getDataLocal } from "../src/user/GetDataLocal.jsx";
import { url } from "../src/Login/AuthContext.jsx";

async function getListFilePathImage(id_good) {
  const dataLocal = getDataLocal();
  if (dataLocal === undefined) {
    console.log("Error from get data local");
    return;
  }

  try {
    const res = await axios.post(
      url + "/api/merchant/good",
      { id: id_good },
      { headers: { Authorization: `Bearer ${dataLocal.token}` } }
    );
    const result = res.data;
    return result;
  } catch (err) {
    console.log("Error from get file path url, err: ", err);
    return { success: false };
  }
}
export { getListFilePathImage };
