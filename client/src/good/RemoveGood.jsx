import axios from "axios";
import { url } from "../Login/AuthContext";
import { getDataLocal } from "../user/GetDataLocal";

async function removeItem(id_good) {
  //id of good
  const id = id_good;
  console.log(id);

  const localData = getDataLocal();
  if (localData === undefined) {
    console.log("Error from delete Item");
    return false;
  }

  const res = await axios
    .post(
      url + "/api/merchant/delete_good",
      { id: id },
      { headers: { Authorization: `Bearer ${localData.token}` } }
    )
    .then((response) => {
      const result = response.data;
      return result;
    })
    .catch((err) => {
      console.log("Error from delete item with api /api/merchant/delete_good");
      return false;
    });
  return res;
}
export { removeItem };
