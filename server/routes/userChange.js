import { Router } from "express";
import { verifyToken } from "../util/usejwt.js";
import {
  changeToMerchant,
  getDataStore,
  updateNameStore,
} from "../controllers/changeDataStore.js";

const router = Router();
router.post("/user/changeToMerchant", verifyToken, changeToMerchant);
router.post("/user/store", verifyToken, getDataStore);
router.post("/user/add-name-store", verifyToken, updateNameStore);

export default router;
