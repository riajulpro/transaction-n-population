import express from "express";
import employee from "./employee.route";
import contact from "./contact.route";
import address from "./address.route";
import personal from "./personalDetails.route";

const router = express.Router();
router.use("/employee", employee);
router.use("/contact", contact);
router.use("/address", address);
router.use("/personal", personal);

export default router;
