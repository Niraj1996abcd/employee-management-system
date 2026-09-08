import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, "Employee ID is required"),

  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),

  department: z
    .string()
    .min(1, "Department is required"),

  designation: z
    .string()
    .min(1, "Designation is required"),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

  salary: z
    .number()
    .positive("Salary must be greater than 0"),

  status: z
    .enum(["ACTIVE", "INACTIVE"])
    .optional(),
});