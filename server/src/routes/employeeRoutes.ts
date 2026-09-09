import { Router } from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import { validate, validateQuery } from "../middleware/validateMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import { createEmployeeSchema, employeeQuerySchema } from "../validators/employeeValidator.js";

const router = Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "HR"),
  validate(createEmployeeSchema),
  createEmployee,
);

// GET ALL
router.get(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  validateQuery(employeeQuerySchema),
  getEmployees,
);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  getEmployeeById,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "HR"),
  updateEmployee,
);

// DELETE
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteEmployee);

export default router;
