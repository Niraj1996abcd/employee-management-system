import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { employeeQuerySchema } from "../validators/employeeValidator.js";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
};

export const validateQuery = (
  schema: typeof employeeQuerySchema
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query);

      req.validatedQuery = validatedQuery;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Query validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
};