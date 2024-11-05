import { secretKey } from "../server.js";
import { db } from "../util/database.js";
import jwt from "jsonwebtoken";

async function deleteGood(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token, error: ", err);
      res.status(400).json({ message: "error" });
    } else {
      const id = req.body.id;
      try {
        const result = await db.query("DELETE FROM goods WHERE id_good=$1", [
          id,
        ]);
        res.status(200).json({ success: true, message: "Success delete item" });
      } catch (err) {
        console.log("Error from delete item good");
        res.status(400).json({ success: false, message: "Failed delete item" });
      }
    }
  });
}

export { deleteGood };
