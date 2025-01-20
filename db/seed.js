

const prisma = require("./prisma.js");
const menuItems =require("../data/MenuItems.json")
const reservation =require("../data/Reservation.json")
const contact =require("../data/Contact.json")

const seed = async () => {
    await prisma.menuItem.createMany({ data: menuItems, skipDuplicates: true }).then(
     
      (response) => {
        console.log(menuItems)
        console.log("menu seeded  ", response);

      }
    );


    await prisma.Reservation.createMany({ data: reservation, skipDuplicates: true }).then(
     
      (response) => {
        console.log(menuItems)
        console.log("nik zzeby ow bara  ", response);

      }
    );

    await prisma.Contact.createMany({ data:contact , skipDuplicates: true }).then(
     
      (response) => {
        console.log(menuItems)
        console.log(" brass ommek e5dem 3asba ", response);
      }
    );
  
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
}
)
