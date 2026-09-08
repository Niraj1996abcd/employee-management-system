import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = Router();

// CREATE
router.post("/", createEmployee);

// GET ALL
router.get("/", getEmployees);

// GET BY ID
router.get("/:id", getEmployeeById);

// UPDATE
router.put("/:id", updateEmployee);

// DELETE
router.delete("/:id", deleteEmployee);

export default router;
