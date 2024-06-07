import express from "express";
import { updateSingleAddress } from "../../controllers/address.controller";
const router = express.Router();

router.patch("/update/:id", updateSingleAddress);

export default router;
