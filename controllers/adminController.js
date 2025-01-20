const prisma = require("../db/prisma")


const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        return res.status(400).send("please provide your email and password");
      }
      const User = await prisma.User.findUnique({
        where: {
          email: email,
        },
      });
      if (!User) {
        return res.status(404).send("user was not found ");
      }
  
      const passwordCompare = await bcrypt.compare(password, User.password);
      if (!passwordCompare) {
        return res.status(405).send("password doesn't match ");
      }
  
      let token = jwt.sign(
        {
          id: User.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .json({token, message: "Login succeeded" });
    } catch (error) {
      return res.status(400).send(error);
    }
  };

const getMenu = async (req,res)=>{
  try {
   const menu = await prisma.menuItem.findMany()

if(!menu){
  console.log("menu is empty ")
}
res.status(200).json(menu)
  }catch(error){
    console.log(error)
  }
}


const getReservation = async (req,res)=>{
  try {
   const reservation = await prisma.reservation.findMany()

if(!reservation){
  console.log("reservation is empty ")
}
res.status(200).json(reservation)
  }catch(error){
    console.log(error)
  }
}


const getContact= async (req,res)=>{
  try {
   const contact = await prisma.contact.findMany()

if(!contact){
  console.log("Contact is empty ")
}
res.status(200).json(contact)
  }catch(error){
    console.log(error)
  }
}

  
module.exports = {
  signin,
  getMenu,
  getReservation,
  getContact
};
