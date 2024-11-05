import { Router } from "express";
import { login, register } from "../controllers/loginRegister.js";
import {
  getData,
  getDataNormalClient,
  postDataGood,
  pushOtherImages,
  updateData,
} from "../controllers/executeData.js";
import { getListType } from "../controllers/changeDataStore.js";
import { verifyToken } from "../util/usejwt.js";
import { body } from "express-validator";

const router = Router();
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("Invalid email").escape(),
    body("password").notEmpty().withMessage("Password is required").escape(),
  ],
  login
);
router.post("/register", register);
router.post("/user/get-data", verifyToken, getData);
router.post("/user/update-infor", verifyToken, updateData);
router.post("/get-data/client-normal", verifyToken, getDataNormalClient);
router.post("/get-list-type-good", getListType);
router.post("/good/post-data", verifyToken, postDataGood);
router.post("/good/post-other-images", verifyToken, pushOtherImages);

export default router;
