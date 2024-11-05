import { secretKey } from "../server.js";
import { db } from "../util/database.js";
import jwt from "jsonwebtoken";

async function getListDataOrder(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const idUser = data.id;
      try {
        const result = await getListOrder(idUser);
        if (result.success) {
          res.status(200).json({ success: true, data: result.data });
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
    }
  });
}

//function to get list order from idUser
async function getListOrder(id) {
  try {
    const result = await db.query(
      "SELECT ord_good.id_order as id_order,ord_good.payment as payment, mer.nameshop as shop_name, gd.name as name_good, gd.type as type, ord_good.quantity as quantity_bought, ord_good.district as district, ord_good.city as city, TO_CHAR(ord_good.date_bought,'DD/MM/YYYY') AS date_bought, img.urlimage AS url_main_image FROM order_good AS ord_good INNER JOIN goods as gd ON ord_good.id_good = gd.id_good INNER JOIN imagegood as img_good ON img_good.id_good = gd.id_good INNER JOIN image as img ON img.id = img_good.id_image INNER JOIN merchant AS mer ON gd.id_merchant = mer.id WHERE ord_good.id_client=$1 AND img.type=$2",
      [id, "main"]
    );
    return { success: true, data: result.rows };
  } catch (err) {
    return { success: false, error: err };
  }
}

export { getListDataOrder };
