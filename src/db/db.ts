import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  max: 20, // Maximum connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections
  connectionTimeoutMillis: 2000, // Timeout on connect
});

// Function to check database connectivity status
const isDBConnected = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    client.release();
    return true; // Database is connected
  } catch (error) {
    return false; // Database is down
  }
};

export { pool, isDBConnected };
