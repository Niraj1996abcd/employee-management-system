import { Router } from "express";

import { register, login } from "../controllers/authController.js";

import { validate } from "../middleware/validateMiddleware.js";

import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = Router();

// REGISTER
router.post("/register", validate(registerSchema), register);

// LOGIN
router.post("/login", validate(loginSchema), login);

export default router;
