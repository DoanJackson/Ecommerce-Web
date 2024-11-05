import { secretKey } from "../server.js";
import { db } from "../util/database.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
async function getData(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      //data get from post: req.body
      const id = data.id;
      try {
        const result = await db.query(
          "SELECT email,name,role FROM users WHERE id=$1",
          [id]
        );
        if (result.rows.length === 1) {
          res.status(200).json({
            email: result.rows[0].email,
            name: result.rows[0].name,
            role: result.rows[0].role,
          });
        }
      } catch (err) {
        res.status(401);
      }
    }
  });
}

async function updateData(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      const id = data.id;
      try {
        const data = req.body;
        await db.query("UPDATE users SET name=$1 WHERE id=$2", [data.name, id]);
        try {
          await db.query(
            "UPDATE client SET age=$1, address=$2, telphone=$3 WHERE id=$4",
            [data.age, data.address, data.telphone, id]
          );
          res.sendStatus(200);
        } catch (err) {
          console.log("Error from update client information: ", err);
        }
      } catch (err) {
        console.log("Error from update users information", err);
      }
    }
  });
}

async function getDataNormalClient(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const id = data.id;
        const result = await db.query(
          "SELECT users.email,users.name,client.age,client.address, client.balance, client.telphone,client.roleclient FROM users INNER JOIN client ON users.id = client.id WHERE users.id = $1",
          [id]
        );
        console.log(result.rows[0]);
        res.status(200).json({
          ...result.rows[0],
        });
        // res.status(200).json({
        //   age: 19,
        //   address: "BC1",
        //   balance: 20,
        //   tel: "0256016033",
        // });
      } catch (err) {
        res.status(401);
      }
    }
  });
}

async function postDataGood(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        //push infor of goods to good
        const data = req.body;
        console.log(data);
        const id = uuidv4();
        await db.query(
          "INSERT INTO goods (id_good, name, quantity, numbersold, cost,type,id_merchant) VALUES ($1,$2,$3,$4,$5,$6,$7)",
          [
            id,
            data.name,
            data.quantity,
            data.numberSold,
            data.cost,
            data.type,
            data.id_merchant,
          ]
        );
        res.status(200).json({
          success: true,
          message: "Insert plain data of good to database success!!!",
          id_good: id,
        });
      } catch (err) {
        res.status(401).json({
          success: false,
          message: "Failed to insert plain data of good to database.",
        });
      }
    }
  });
}

async function pushOtherImages(req, res) {
  jwt.verify(req.token, secretKey, async (err, dataNe) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        //push infor of goods to good
        const dataOther = req.body;
        const data = dataOther.dataOtherImages;
        //insert to image table
        await Promise.all(
          data.map((item) => {
            return db.query(
              "INSERT INTO image (id,filedirectory, urlimage,type) VALUES ($1,$2,$3,$4)",
              [item.id, item.fileDirectory, item.urlImage, item.type]
            );
          })
        );

        await Promise.all(
          data.map((item) => {
            return db.query(
              "INSERT INTO imagegood (id_image,id_good) VALUES ($1,$2)",
              [item.id, item.idGood]
            );
          })
        );
        res.status(200).json({
          success: true,
          message:
            "Insert data images of good to database imagegood success!!!",
        });

        //insert into imagegood
      } catch (err) {
        console.log("Erscsocmaso, err: ", err);
        res.status(500).json({
          success: false,
          message: "Failed to insert data images of good to database.",
        });
      }
    }
  });
}

export {
  getData,
  updateData,
  getDataNormalClient,
  postDataGood,
  pushOtherImages,
};
