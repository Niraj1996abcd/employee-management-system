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
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  validate(createEmployeeSchema),
  createEmployee,
);

// GET ALL
router.get("/", authMiddleware, getEmployees);

// GET BY ID
router.get("/:id", authMiddleware, getEmployeeById);

// UPDATE
router.put("/:id", authMiddleware, updateEmployee);

// DELETE
router.delete("/:id", authMiddleware, deleteEmployee);

export default router;
