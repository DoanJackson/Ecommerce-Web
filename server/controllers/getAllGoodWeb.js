import e from "cors";
import { secretKey } from "../server.js";
import { db } from "../util/database.js";
import jwt from "jsonwebtoken";

async function getAllGoodWeb(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ success: false, message: "error" });
    } else {
      try {
        const result = await db.query("SELECT COUNT (*) FROM goods");
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

async function getGoodPage(req, res) {
  console.log("get good page");
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ success: false, message: "error" });
    } else {
      const page = parseInt(req.query.page) || 1; //query page, if not exist default is page 1
      const limit = parseInt(req.query.limit) || 8; //query limit, if not exist default is limit 8
      const offset = (page - 1) * limit;
      let result;
      try {
        //get plain data of good
        result = await db.query(
          "SELECT id_good,name,quantity,numbersold,cost,type FROM goods ORDER BY created_at DESC LIMIT $1 OFFSET $2 ",
          [limit, offset]
        );

        //get data of main image
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

        // return result
        res.status(200).json({ success: true, page: page, res: updatedRows });
      } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: err });
      }
    }
  });
}

async function getURLImageGood(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ message: "error" });
    } else {
      try {
        const id_good = req.body.id;
        const result = await db.query(
          "SELECT image.urlimage FROM imagegood INNER JOIN image ON imagegood.id_image = image.id WHERE imagegood.id_good=$1",
          [id_good]
        );
        // console.log(result.rows);
        res.status(200).json({ success: true, result: result.rows });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: `Error From retrieve url image, err: ${err}`,
        });
      }
    }
  });
}

async function getDetailPlainGood(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ message: "error" });
    } else {
      try {
        const id_good = req.body.id;
        const result = await db.query(
          "SELECT name,quantity,numbersold,cost,type FROM goods WHERE id_good=$1",
          [id_good]
        );
        res.status(200).json({ success: true, detail: result.rows[0] });
      } catch (err) {
        res.status(400).json({ success: false, error: err });
      }
    }
  });
}
export { getAllGoodWeb, getGoodPage, getURLImageGood, getDetailPlainGood };
