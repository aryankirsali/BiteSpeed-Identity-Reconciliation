import { Request, Response } from "express";
import { identifyContact } from "../services/contactService";

const identifyContactHandler = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body;
    const contactData = await identifyContact(email, phoneNumber);
    res.status(200).json({ contact: contactData });
  } catch (err: any) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export default { identifyContact: identifyContactHandler };
