const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const data = [

    {
      "category": "CONTORNI",
      "items": [
        {
          "name": "SOPPRESSATA MEATBALL",
          description: "",
          "price": 10
        },
        {
          "name": "GRILLED ITALIAN SAUSAGE",
          description: "",

          "price": 9
          
        },
        {
          "name": "WILTED ESCAROLE",
          description: "",

          "price": 7
        },
        {
          "name": "CRISPY YUKON POTATOES",
          description: "",

          "price": 8
        }
      ]
    }
  ]

  for (const categoryData of data) {
    const createdCategory = await prisma.category.create({
      data: {
        name: categoryData.category,
        items: {
          create: categoryData.items.map((item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            unit: item.unit || null,
            extras: item.extras
              ? {
                  create: Object.entries(item.extras).map(([name, price]) => ({
                    name,
                    price,
                  })),
                }
              : undefined,
          })),
        },
      },
    });

    console.log(`Created category: ${createdCategory.name}`);
  }
}

main()
  .then(() => {
    console.log("Seeding completed!");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    prisma.$disconnect();
    process.exit(1);
  });
