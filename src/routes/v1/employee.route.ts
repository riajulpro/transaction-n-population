import express from "express";
import {
  createAnEmployee,
  deleteAnEmployee,
  readEmployees,
  readSingleEmployee,
  updateAnEmployee,
} from "../../controllers/employee.controller";

const router = express.Router();
router.post("/create", createAnEmployee);
router.get("/get", readEmployees);
router.get("/get/single/:id", readSingleEmployee);
router.patch("/update/:id", updateAnEmployee);
router.delete("/delete/:id", deleteAnEmployee);

export default router;
