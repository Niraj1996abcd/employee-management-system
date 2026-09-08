import { Router } from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import { validate } from "../middleware/validateMiddleware.js";
import { createEmployeeSchema } from "../validators/employeeValidator.js";

const router = Router();

// CREATE
router.post(
  "/",
  validate(createEmployeeSchema),
  createEmployee
);

// GET ALL
router.get("/", getEmployees);

// GET BY ID
router.get("/:id", getEmployeeById);

// UPDATE
router.put("/:id", updateEmployee);

// DELETE
router.delete("/:id", deleteEmployee);

export default router;