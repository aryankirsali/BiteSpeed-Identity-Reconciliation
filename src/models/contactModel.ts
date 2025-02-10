import { pool } from "../db/db";
import {
  FIND_BY_EMAIL_OR_PHONE,
  CREATE_CONTACT,
  UPDATE_CONTACT_LINK_PRECEDENCE,
} from "../models/contactQueries";

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
  const result = await pool.query(FIND_BY_EMAIL_OR_PHONE, [
    email || null,
    phone || null,
  ]);
  return result.rows;
};

export const createContact = async (
  email: string | undefined,
  phone: string | undefined,
  linkedId: number | null,
  linkPrecedence: "primary" | "secondary"
) => {
  const result = await pool.query(CREATE_CONTACT, [
    email || null,
    phone || null,
    linkedId,
    linkPrecedence,
  ]);
  return result.rows[0];
};

export const updateContactLinkPrecedence = async (
  contactId: number,
  newPrimaryId: number
) => {
  await pool.query(UPDATE_CONTACT_LINK_PRECEDENCE, [newPrimaryId, contactId]);
};
