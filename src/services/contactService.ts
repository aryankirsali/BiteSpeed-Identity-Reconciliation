import { findContactByEmailOrPhone } from "../models/contactModel";

export const identifyContact = async (email?: string, phoneNumber?: string) => {
  if (!email && !phoneNumber) {
    throw new Error("Email or phoneNumber is required");
  }

  const contacts = await findContactByEmailOrPhone(email, phoneNumber);

  return {
    primaryContactId: contacts.length ? contacts[0].id : null,
    emails: [...new Set(contacts.map((c) => c.email))],
    phoneNumbers: [...new Set(contacts.map((c) => c.phone_number))],
    secondaryContactIds: contacts.slice(1).map((c) => c.id),
  };
};
