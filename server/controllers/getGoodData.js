import { secretKey } from "../server.js";
import { db } from "../util/database.js";
import jwt from "jsonwebtoken";

async function getGoodOfMerchant(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ message: "error" });
    } else {
      const id = data.id;
      const page = parseInt(req.query.page) || 1; //query page, if not exist default is page 1
      const limit = parseInt(req.query.limit) || 8; //query limit, if not exist default is limit 8
      const offset = (page - 1) * limit;
      let result;
      try {
        result = await db.query(
          "SELECT id_good,name,quantity,numbersold,cost,type FROM goods WHERE id_merchant=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3 ",
          [id, limit, offset]
        );

        //get main image
        const updatedRows = await Promise.all(
          result.rows.map(async (item) => {
            const mainImage = await db.query(
              "SELECT urlimage FROM image INNER JOIN imagegood ON imagegood.id_image = image.id WHERE id_good=$1 and type=$2",
              [item.id_good, "main"]
            );
            return {
              ...item,
              urlImage: mainImage.rows[0]?.urlimage || null,
            };
          })
        );

        res.status(200).json({ success: true, page: page, res: updatedRows });
      } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: err });
      }
    }
  });
}

async function getNumberGoodClient(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ message: "error" });
    } else {
      const id = data.id;
      try {
        const result = await db.query(
          "SELECT COUNT (*) FROM goods WHERE id_merchant=$1",
          [id]
        );
        // console.log(result.rows[0]);
        res
          .status(200)
          .json({ success: true, number_good: result.rows[0].count });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err });
      }
    }
  });
}

export { getGoodOfMerchant, getNumberGoodClient };
