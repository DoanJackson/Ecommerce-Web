import jwt from "jsonwebtoken";
import { secretKey } from "../server.js";
import { db } from "../util/database.js";

async function changeToMerchant(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token (changeToMerchant), error: ", err);
      res.sendStatus(404);
    } else {
      //get id of user
      const id = data.id;
      try {
        // delete user in clientnormal table
        await db.query("DELETE FROM clientnormal WHERE id=$1", [id]);
        try {
          //insert user to merchant table
          await db.query("INSERT INTO merchant (id) VALUES ($1)", [id]);
          try {
            await db.query("UPDATE client SET roleclient=$1 WHERE id=$2", [
              "merchant",
              id,
            ]);
            res.status(200).json({
              success: true,
              message: "Change role to merchant success!!!",
            });
          } catch (err) {
            console.log(
              "Error from update roleclient in client table, error: ",
              err
            );
            res.status(404).json({
              success: false,
              message: err,
            });
          }
        } catch (err) {
          console.log("Error from insert client to merchant, error: ", err);
          res.status(404).json({
            success: false,
            message: err,
          });
        }
      } catch (err) {
        console.log("Error from delete a clientnormal, error: ", err);
        res.status(404).json({
          success: false,
          message: err,
        });
      }
    }
  });
}
async function getDataStore(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token (getDataStore), error: ", err);
      res.sendStatus(404);
    } else {
      //get id of user
      const id = data.id;
      try {
        const result = await db.query(
          "SELECT (nameshop) FROM merchant WHERE id=$1",
          [id]
        );
        if (result.rows.length === 1) {
          res.status(200).json({
            success: true,
            data: result.rows[0],
            message: "Get data of store from merchant table success!!!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Don't find information about your store",
          });
        }
      } catch (err) {
        console.log("Error from retriving data of store", err);
      }
    }
  });
}

async function updateNameStore(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      console.log("Error from verify token (getDataStore), error: ", err);
      res.sendStatus(404);
    } else {
      const id = data.id;
      const name = req.body.nameshop;
      try {
        await db.query("UPDATE merchant SET nameshop=$1 WHERE id=$2", [
          name,
          id,
        ]);
        res.status(200).json({
          success: true,
          message: "Update name of shop sucessful!!!",
        });
      } catch (err) {
        console.log("Error from update name of store, error: ", err);
        res.status(409).json({
          success: false,
          message: "Update name of shop failed!!!",
        });
      }
    }
  });
}

async function getListType(req, res) {
  try {
    const result = await db.query("SELECT * FROM typegood");
    res.status(200).json({
      success: true,
      data: result.rows,
      message: "Get List type successfull!!!",
    });
  } catch (err) {
    console.log("Error from get list of type good");
    res.status(404).json({
      success: false,
      message: "Fail to get List type!!!",
    });
  }
}

export { changeToMerchant, getDataStore, updateNameStore, getListType };
