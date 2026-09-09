import type { JwtPayload } from "../middleware/authMiddleware.js";
import type { employeeQuerySchema } from "../validators/employeeValidator.js";
import type { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      validatedQuery?: z.infer<typeof employeeQuerySchema>;
    }
  }
}

export {};