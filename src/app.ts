import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";
import { isDBConnected } from "./db/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/health", async (req, res) => {
  const dbStatus = await isDBConnected();
  res.status(200).json({
    server: "🟢 Server is running",
    database: dbStatus ? "🟢 Database is connected" : "🔴 Database is down",
  });
});

// API Routes
app.use("/identify", contactRoutes);

export default app;
