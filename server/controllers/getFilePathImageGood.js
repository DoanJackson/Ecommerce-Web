import { db } from "../util/database.js";
import { secretKey } from "../server.js";
import jwt from "jsonwebtoken";

async function getAllPathImageGood(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ message: "error" });
    } else {
      try {
        const id_good = req.body.id;
        const result = await db.query(
          "SELECT image.filedirectory FROM imagegood INNER JOIN image ON imagegood.id_image = image.id WHERE imagegood.id_good=$1",
          [id_good]
        );
        // console.log(result.rows);
        res.status(200).json({ success: true, result: result.rows });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: `Error From retrieve filepath, err: ${err}`,
        });
      }
    }
  });
}
export { getAllPathImageGood };
