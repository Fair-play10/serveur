const prisma = require("../db/prisma")
const createContact = async (req, res) => {
  try {
    const contact = await prisma.contact.create({
      data: req.body,
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create contact message' });
  }
};

module.exports = {
  createContact,
};
