import { Router } from "express";
import {
  getAllGoodWeb,
  getDetailPlainGood,
  getGoodPage,
  getURLImageGood,
} from "../controllers/getAllGoodWeb.js";
import { verifyToken } from "../util/usejwt.js";

const router = Router();

router.get("/get_all_good", verifyToken, getAllGoodWeb);
router.get("/all_good_information", verifyToken, getGoodPage);
router.post("/good_data", verifyToken, getURLImageGood);
router.post("/good_detail", verifyToken, getDetailPlainGood);

export default router;
