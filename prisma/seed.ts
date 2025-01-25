import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const data = [
    {
      name: "STUZZI",
      items: [
        {
          name: "SARAH'S SPUNTINO",
          description: "24mo parmigiano reggiano, hand rolled grissini, artisan salami, balsamic from our batteria",
          price: 14,
        },
        {
          name: "MOZZARELLA SHOOTER",
          description: "tomato dashi, giardiniera, shallot",
          price: 7,
          unit: "per piece",
        },
        // Add remaining items here...
      ],
    },
    {
      name: "SHARED PLATES",
      items: [
        {
          name: "BURRATA E HAM",
          description: "rosemary tigelle, prosciutto di san daniele, apple cranberry mostarda",
          price: 36,
          extras: [
            { name: "add prosciutto butter", price: 4 },
            { name: "add artisan salami", price: 5 },
          ],
        },
        // Add remaining items here...
      ],
    },
    // Add remaining categories here...
  ];

  for (const category of data) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        items: {
          create: category.items.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            unit: item.unit || null,
            extras: item.extras
              ? { create: item.extras.map(extra => ({ name: extra.name, price: extra.price })) }
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
  .catch(error => {
    console.error("Error seeding data:", error);
    prisma.$disconnect();
  });
