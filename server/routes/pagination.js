import { Router } from "express";
import {
  getGoodOfMerchant,
  getNumberGoodClient,
} from "../controllers/getGoodData.js";
import { verifyToken } from "../util/usejwt.js";
import { getAllPathImageGood } from "../controllers/getFilePathImageGood.js";

const router = Router();

router.get("/user/good_merchant", verifyToken, getGoodOfMerchant); //default is page 1,
router.get("/user/get_number_good", verifyToken, getNumberGoodClient);
router.post("/merchant/good", verifyToken, getAllPathImageGood);

export default router;
