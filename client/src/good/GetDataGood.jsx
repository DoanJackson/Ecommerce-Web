import axios from "axios";
import { url } from "../Login/AuthContext";
import { getDataLocal } from "../user/GetDataLocal";

async function getDetailGood(id) {
  const localData = getDataLocal();
  if (localData === undefined) {
    console.log("Error from retrieving data local");
    return { success: false, error: "Error from retrieving data local" };
  }

  const res = await axios.post(
    url + "/api/good_detail",
    { id: id },
    { headers: { Authorization: `Bearer ${localData.token}` } }
  );
  const result = res.data;

  if (result.success) {
    return { success: true, detail: result.detail };
  } else {
    return { success: false, error: result.error };
  }
}
export { getDetailGood };
