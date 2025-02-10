import pool from "../db/db";

export interface Contact {
  id: number;
  phone_number: string;
  email: string;
  linked_id?: number;
  link_precedence: "primary" | "secondary";
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export const findContactByEmailOrPhone = async (
  email?: string,
  phone?: string
) => {
  const result = await pool.query(
    `SELECT * FROM contacts WHERE email = $1 OR phone_number = $2`,
    [email || null, phone || null]
  );
  return result.rows;
};
