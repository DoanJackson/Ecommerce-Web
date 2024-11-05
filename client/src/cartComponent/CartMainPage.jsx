import { useEffect, useState } from "react";
import { ItemGoodCart } from "./ItemGoodComponent";
import axios from "axios";
import { url } from "../Login/AuthContext.jsx";
import { getDataLocal } from "../user/GetDataLocal.jsx";
function CartComponent() {
  const [listOrder, setListOrder] = useState([]);

  async function getListOrder() {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error fromg getting local data");
      return;
    }

    try {
      const result = await axios.get(url + "/api/get_data_order", {
        headers: { Authorization: `Bearer ${localData.token}` },
      });
      const resPlain = result.data; //{success, data:{id_order,shop_name,name_good,quantity_bought,distric,city,date_bought}}
      if (resPlain.success) {
        setListOrder(resPlain.data);
      } else {
        throw new Error(resPlain.error);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getListOrder();
      console.log(listOrder);
    };
    fetchData();
  }, []);

  return (
    <>
      {listOrder.map((item) => (
        <ItemGoodCart key={item.id_order} data={item} />
      ))}
    </>
  );
}
export default CartComponent;
