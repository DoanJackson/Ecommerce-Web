import jwt from "jsonwebtoken";
// import { getIO } from "../socket.js";

//verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(404);
  }
}

//sign for new jwt
function signJwt(payload, secretKey, expireIn, message, res) {
  jwt.sign(payload, secretKey, { expiresIn: expireIn }, (err, token) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    } else {
      //test only
      // getIO().on("connection", (socket) => {
      //   socket.emit("posts", {
      //     post: `Login user id ${socket.id} success nhe`,
      //   });
      // });

      //Inform to all user that an user with id has logged in.
      // getIO().emit("posts", {
      //   post: `User with ID ${payload.id} has logged/registered successfully`,
      // });
      //test only
      res.status(200).json({
        success: true,
        token: token,
        message: message,
        id: payload.id,
      });
    }
  });
}
export { verifyToken, signJwt };
