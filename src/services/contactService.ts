import {
  findContactByEmailOrPhone,
  createContact,
  updateContactLinkPrecedence,
} from "../models/contactModel";
import { Contact } from "../models/contactModel";

/**
 * Identify and manage contacts based on email or phone number.
 */
export const identifyContact = async (email?: string, phoneNumber?: string) => {
  try {
    if (!email && !phoneNumber) {
      throw new Error("Email or phoneNumber is required");
    }

    console.log(
      `[identifyContact] Checking contacts for email: ${email}, phone: ${phoneNumber}`
    );
    const contacts = await findContactByEmailOrPhone(email, phoneNumber);

    return contacts.length
      ? handleExistingContacts(contacts, email, phoneNumber)
      : createPrimaryContact(email, phoneNumber);
  } catch (error: any) {
    console.error(`[identifyContact] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Creates a new primary contact when no existing contact is found.
 */
const createPrimaryContact = async (email?: string, phoneNumber?: string) => {
  try {
    console.log(
      `[createPrimaryContact] Creating new primary contact for email: ${email}, phone: ${phoneNumber}`
    );
    const newContact = await createContact(email, phoneNumber, null, "primary");
    return formatContactResponse(newContact, []);
  } catch (error: any) {
    console.error(`[createPrimaryContact] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Handles merging of primary and secondary contacts.
 */
const handleExistingContacts = async (
  contacts: Contact[],
  email?: string,
  phoneNumber?: string
) => {
  try {
    console.log(
      `[handleExistingContacts] Processing ${contacts.length} existing contacts`
    );

    let primaryContact = contacts.find((c) => !c.linked_id) || contacts[0];
    let secondaryContacts = contacts.filter((c) => c.linked_id);

    const existingEmails = new Set(contacts.map((c) => c.email));
    const existingPhones = new Set(contacts.map((c) => c.phone_number));

    const shouldCreateSecondary =
      (email && !existingEmails.has(email)) ||
      (phoneNumber && !existingPhones.has(phoneNumber));

    let newSecondaryContact = null;
    if (shouldCreateSecondary) {
      console.log(
        `[handleExistingContacts] Creating secondary contact for email: ${email}, phone: ${phoneNumber}`
      );
      newSecondaryContact = await createContact(
        email,
        phoneNumber,
        primaryContact.id,
        "secondary"
      );
      secondaryContacts.push(newSecondaryContact);
    }

    // Check if any existing primary should be converted to secondary
    const primaries = contacts.filter((c) => !c.linked_id);
    if (primaries.length > 1) {
      // Pick the oldest primary as the real primary
      primaryContact = primaries.reduce((oldest, contact) =>
        contact.created_at < oldest.created_at ? contact : oldest
      );

      // Convert others to secondary
      for (const contact of primaries) {
        if (contact.id !== primaryContact.id) {
          await updateContactLinkPrecedence(contact.id, primaryContact.id);
          secondaryContacts.push({ ...contact, linked_id: primaryContact.id });
        }
      }
    }

    return formatContactResponse(primaryContact, secondaryContacts);
  } catch (error: any) {
    console.error(`[handleExistingContacts] Error: ${error.message}`);
    throw error;
  }
};

/**
 * Formats the response object.
 */
const formatContactResponse = (
  primary: Contact,
  secondaryContacts: Contact[]
) => {
  try {
    console.log(
      `[formatContactResponse] Formatting response for primary contact ID: ${primary.id}`
    );

    return {
      contact: {
        primaryContactId: primary.id,
        emails: [
          ...new Set(
            [primary.email, ...secondaryContacts.map((c) => c.email)].filter(
              Boolean
            )
          ),
        ],
        phoneNumbers: [
          ...new Set(
            [
              primary.phone_number,
              ...secondaryContacts.map((c) => c.phone_number),
            ].filter(Boolean)
          ),
        ],
        secondaryContactIds: secondaryContacts.map((c) => c.id),
      },
    };
  } catch (error: any) {
    console.error(`[formatContactResponse] Error: ${error.message}`);
    throw error;
  }
};
