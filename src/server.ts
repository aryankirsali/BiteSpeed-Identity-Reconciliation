import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db/db";
import identifyRoutes from "./routes/identify";

dotenv.config();

const app = express();

// Middlewares to check for correct input format
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/identify", identifyRoutes);

// Test DB connection on startup, create connection pool once on server start
pool
  .query("SELECT 1")
  .then(() => console.log("Database ready"))
  .catch((err) => console.error("Database initialization failed:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
