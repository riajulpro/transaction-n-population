import express from "express";
import { updateSinglePersonalDetails } from "../../controllers/personalDetails.controller";
const router = express.Router();

router.patch("/update/:id", updateSinglePersonalDetails);

export default router;
