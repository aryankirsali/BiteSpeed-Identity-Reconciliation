import { Request, Response } from "express";

const identifyContact = async (req: Request, res: Response) => {
  try {
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export default { identifyContact };
