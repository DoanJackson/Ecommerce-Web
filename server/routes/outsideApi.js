import { Router } from "express";
import { getDistrict, getTown } from "../controllers/getDataAddress.js";

const router = Router();

router.get("/province", getTown);
router.post("/province/district", getDistrict);

export default router;
