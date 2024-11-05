import { Router } from "express";
import { verifyToken } from "../util/usejwt.js";
import { addGoodToUser } from "../controllers/addGoodUser.js";

const router = Router();

router.post("/add_good_to_cart", verifyToken, addGoodToUser);

export default router;
