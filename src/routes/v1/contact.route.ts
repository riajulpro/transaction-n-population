import express from "express";
import { updateSingleContact } from "../../controllers/contact.controller";
const router = express.Router();

router.patch("/update/:id", updateSingleContact);

export default router;
