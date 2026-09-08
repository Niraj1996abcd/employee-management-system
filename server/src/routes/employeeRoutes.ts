import { Router } from "express";
import { createEmployee, getEmployees } from "../controllers/employeeController.js";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);

export default router;