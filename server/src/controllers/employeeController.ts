import type { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee.js";
// CREATE EMPLOYEE
export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};
// GET ALL EMPLOYEES
export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, search, department, status, sortBy, sortOrder } =
      req.validatedQuery!;

    const skip = (page - 1) * limit;

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const searchQuery: Record<string, any> = {};

    if (search) {
      searchQuery.$or = [
        { employeeId: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (department) {
      searchQuery.department = {
        $regex: department,
        $options: "i",
      };
    }

    if (status) {
      searchQuery.status = status;
    }

    const employees = await Employee.find(searchQuery)
      .sort({
        [sortBy]: sortDirection,
      })
      .skip(skip)
      .limit(limit);

    const totalEmployees = await Employee.countDocuments(searchQuery);

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
      pagination: {
        page,
        limit,
        totalEmployees,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};
