import type { Request, Response } from "express";
import Employee from "../models/Employee.js";

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};