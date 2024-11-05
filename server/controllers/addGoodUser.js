import jwt from "jsonwebtoken";
import { secretKey } from "../server.js";
import { db } from "../util/database.js";
import { v4 as uuidv4 } from "uuid";

//truyen vao id cua good tu body
async function addGoodToUser(req, res) {
  jwt.verify(req.token, secretKey, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id, address, quantity } = req.body; //id in here is id of good
      const idUser = data.id;
      const idOrder = uuidv4();

      //add good to cart
      try {
        const dataGood = await getDataGood(id);
        if (dataGood.success) {
          const quantityRemainOfGood = parseInt(dataGood.quantity, 10);
          const quantityOrder = parseInt(quantity);
          const cost = parseInt(dataGood.cost);
          if (quantityOrder === 0) {
            throw new Error("Quantity must be greater than 0.");
          } else if (quantityRemainOfGood < quantityOrder) {
            throw new Error(
              "Quantity of remaining good is not enough for order"
            );
          } else {
            //add to order table
            const payment = quantityOrder * cost;
            await db.query(
              "INSERT INTO order_good (id_order,id_client,id_good,quantity,city,district,payment) VALUES ($1,$2,$3,$4,$5,$6,$7)",
              [
                idOrder,
                idUser,
                id,
                quantityOrder,
                address.city,
                address.district,
                payment,
              ]
            );
            //numberSoldNew = numberSoldOld + quantityOrder
            const numberSoldNew = parseInt(dataGood.numberSold) + quantityOrder;
            //quantityNew = quantityOld - quantityOrder (quantity in here is remaining)
            const quantityNew = parseInt(dataGood.quantity) - quantityOrder;
            //update quantity remaining and number sold of good
            await db.query(
              "UPDATE goods SET quantity=$1,numbersold=$2 WHERE id_good=$3",
              [quantityNew, numberSoldNew, id]
            );
            //repsonse client
            res
              .status(200)
              .json({ success: true, message: "Success adding good to cart" });
          }
        } else {
          throw new Error("Error from getting information of good.");
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          error: err.message,
        });
      }
    }
  });
}

//function to get quantity and number sold
async function getDataGood(id) {
  try {
    const result = await db.query(
      "SELECT numbersold,quantity,cost FROM goods WHERE id_good=$1",
      [id]
    );
    if (result.rows.length !== 0) {
      return {
        success: true,
        quantity: result.rows[0].quantity,
        numberSold: result.rows[0].numbersold,
        cost: result.rows[0].cost,
      };
    } else {
      throw new Error("No good found with the given ID");
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export { addGoodToUser };
