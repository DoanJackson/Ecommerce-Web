import { secretKey } from "../server.js";
import { signJwt } from "../util/usejwt.js";
import { db } from "../util/database.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { models, sequelize } from "../models/db_main.js";
import { QueryTypes } from "sequelize";
// import { sendMessageLoginSuccess } from "../../client/src/socketUser/socketClient.js";
// async function login(req, res) {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     console.log("error: ", result.array());
//     res.status(404).json({
//       success: false,
//       message: "Your data is missing or unvalid",
//       error: result.array(),
//     });
//     return;
//   }
//   // console.log(req.body);
//   const { email, password } = req.body;
//   try {
//     const result = await db.query(
//       "SELECT id,email FROM users WHERE email=$1 AND password=$2",
//       [email, password]
//     );
//     if (result.rows.length === 1) {
//       const payload = {
//         id: result.rows[0].id,
//       };
//       signJwt(payload, secretKey, "2h", "Login successfull!!!", res);
//     } else {
//       res.status(401).json({ success: false, message: "Login failed" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// import { sendMessageLoginSuccess } from "../../client/src/socketUser/socketClient.js";
// async function login(req, res) {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     console.log("error: ", result.array());
//     res.status(404).json({
//       success: false,
//       message: "Your data is missing or unvalid",
//       error: result.array(),
//     });
//     return;
//   }
//   // console.log(req.body);
//   const { email, password } = req.body;
//   try {
//     const result = await sequelize.query(
//       "SELECT id,email FROM users WHERE email= :email AND password= :password",
//       {
//         replacements: {
//           email: email,
//           password: password,
//         },
//         type: QueryTypes.SELECT,
//       }
//     );
//     console.log("break");
//     if (result.length === 1) {
//       const payload = {
//         id: result[0].id,
//       };
//       signJwt(payload, secretKey, "2h", "Login successfull!!!", res);
//     } else {
//       res.status(401).json({ success: false, message: "Login failed" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
// checkfunction
// import { sendMessageLoginSuccess } from "../../client/src/socketUser/socketClient.js";
async function login(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log("error: ", result.array());
    res.status(404).json({
      success: false,
      message: "Your data is missing or unvalid",
      error: result.array(),
    });
    return;
  }
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    const result = await models.Users.findOne({
      attributes: ["id", "email"],
      where: {
        email: email,
        password: password,
      },
    });

    if (result !== null) {
      const payload = {
        id: result.id,
      };
      signJwt(payload, secretKey, "2h", "Login successfull!!!", res);
    } else {
      res.status(401).json({ success: false, message: "Login failed" });
    }
  } catch (err) {
    console.log(err);
  }
}
// checkfunction

async function register(req, res) {
  const userData = req.body;
  const id = uuidv4();
  try {
    //add new user
    const result = await db.query(
      "INSERT INTO users (id,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id",
      [id, userData.email, userData.password, "user"]
    );
    //add infor to client table
    try {
      await db.query(
        "INSERT INTO client (id, roleclient, balance) VALUES ($1,$2,$3)",
        [id, "user_normal", 0]
      );
      try {
        //add data to clientnormal table
        await db.query("INSERT INTO clientnormal (id) VALUES ($1)", [id]);
      } catch (err) {
        console.log("Error from insert clientnormal: ", err);
        return;
      }
    } catch (err) {
      console.log("Error from insert client: ", err);
      return;
    }

    const payload = {
      id: result.rows[0].id,
    };
    console.log(payload);
    // sendMessageLoginSuccess(id);
    signJwt(payload, secretKey, "2h", "Register successfull!!!", res);
  } catch (err) {
    console.log(err);
    res.json({ succes: false, message: err });
  }
}

export { login, register };
