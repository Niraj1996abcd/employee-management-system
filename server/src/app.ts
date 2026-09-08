import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

app.use("/api/employees", employeeRoutes);
app.use(errorMiddleware);
export default app;
