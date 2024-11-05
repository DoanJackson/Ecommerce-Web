import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import userLoginRegister from "./routes/user.js";
import userChange from "./routes/userChange.js";
import goodData from "./routes/pagination.js";
import goodChange from "./routes/goodChange.js";
import getAllGood from "./routes/getAllGood.js";
import addGoodCart from "./routes/addGood.js";
import getOutsizeApi from "./routes/outsideApi.js";
import order from "./routes/order.js";
import dotenv from "dotenv";
// import { initSocket, userSocket } from "./socket.js";

dotenv.config();

const app = express();
const port = 5000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(
  session({
    name: "my-cookie",
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 1000,
    },
  })
);
//api for user
app.use("/api", userLoginRegister);
app.use("/api", userChange);
app.use("/api", getAllGood);
app.use("/api", addGoodCart);
app.use("/api", order);
//api for get good data of merchant
app.use("/api", goodData);
app.use("/api", goodChange);

//api another place
app.use("/api", getOutsizeApi);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// const io = initSocket(expressServer);
// io.on("connection", (socket) => {
//   console.log("client ", socket.id, " connected");

//   socket.on("login", (userId) => {
//     userSocket[userId] = socket.id;
//     console.log(`Socket ID for user ${userId}: ${socket.id}`);
//   });

//   socket.on("sign_out", () => {
//     console.log("client ", socket.id, " sign out");
//     for (const userId in userSocket) {
//       if (userSocket[userId] === socket.id) {
//         console.log(`User with id: ${userId} has sign out`);
//         delete userSocket[userId];
//         break;
//       }
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("client ", socket.id, " disconnect");
//     for (const userId in userSocket) {
//       if (userSocket[userId] === socket.id) {
//         console.log(`User with id: ${userId} has disconnect`);
//         delete userSocket[userId];
//         break;
//       }
//     }
//   });
// });

export { secretKey };
