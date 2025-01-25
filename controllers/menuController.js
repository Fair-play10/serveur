const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


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
    const categories = await prisma.category.findMany({
      include: {
        items: true, 
      },
    });

    const data = categories.map((category) => ({
      category: category.name,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
    }));
    res.json({data});
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to fetch menu items' });
  }
};

module.exports = {
  addMenuItem,
  fetchMenu,
};
