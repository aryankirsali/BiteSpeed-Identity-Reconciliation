// Query to find contacts by email or phone
export const FIND_BY_EMAIL_OR_PHONE = `
  SELECT * FROM contacts
  WHERE email = $1 OR phone_number = $2 AND deleted_at IS NULL;
`;

// Query to create a new contact
export const CREATE_CONTACT = `
  INSERT INTO contacts (email, phone_number, linked_id, link_precedence, created_at, updated_at)
  VALUES ($1, $2, $3, $4, NOW(), NOW())
  RETURNING *;
`;

// Query to update contact link precedence
export const UPDATE_CONTACT_LINK_PRECEDENCE = `
  UPDATE contacts
  SET linked_id = $1, link_precedence = 'secondary', updated_at = NOW()
  WHERE id = $2;
`;
