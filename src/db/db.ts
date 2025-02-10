import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
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
