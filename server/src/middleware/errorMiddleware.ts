import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);

  // MongoDB duplicate key error
  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue || {})[0];

    return res.status(409).json({
      success: false,
      message: `${duplicateField} already exists`,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
