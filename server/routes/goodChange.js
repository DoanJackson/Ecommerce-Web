import { Router } from "express";
import { verifyToken } from "../util/usejwt.js";
import { deleteGood } from "../controllers/changeGoodControl.js";

const router = Router();
router.post("/merchant/delete_good", verifyToken, deleteGood);

export default router;
