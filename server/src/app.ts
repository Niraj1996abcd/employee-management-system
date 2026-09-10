import "dotenv/config";

import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

// console.log("CLIENT_URL:", process.env.CLIENT_URL);
const allowedOrigins = process.env.CLIENT_URL?.split(",") || [];
app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.use(errorMiddleware);

export default app;
