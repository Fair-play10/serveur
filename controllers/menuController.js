const prisma = require("../db/prisma")

const addMenuItem = async (req, res) => {
  try {
    const menuItem = await prisma.menuItem.create({
      data: req.body,
    });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add menu item' });
  }
};

const fetchMenu = async (req, res) => {
  try {
    const menuItems = await prisma.MenuItem.findMany();
    res.status(200).json(menuItems);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to fetch menu items' });
  }
};

module.exports = {
  addMenuItem,
  fetchMenu,
};
