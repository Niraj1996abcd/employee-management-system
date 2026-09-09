import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),

  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),

  department: z.string().min(1, "Department is required"),

  designation: z.string().min(1, "Designation is required"),

  joiningDate: z.string().min(1, "Joining date is required"),

  salary: z.number().positive("Salary must be greater than 0"),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const employeeQuerySchema = z.object({
  page: z.coerce
    .number()
    .int("Page must be an integer")
    .min(1, "Page must be at least 1")
    .default(1),

  limit: z.coerce
    .number()
    .int("Limit must be an integer")
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),

  search: z.string().trim().optional(),

  department: z.string().trim().optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),

  sortBy: z
    .enum(["createdAt", "firstName", "salary", "joiningDate"])
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
