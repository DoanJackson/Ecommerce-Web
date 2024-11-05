import { Router } from "express";
import { verifyToken } from "../util/usejwt.js";
import { getListDataOrder } from "../controllers/dataOrder.js";

const router = Router();

router.get("/get_data_order", verifyToken, getListDataOrder);

export default router;
