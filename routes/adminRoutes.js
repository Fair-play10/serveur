const express = require('express');

const {getMenu,getContact,getReservation}=require("../controllers/adminController")

const router = express.Router();



router.get('/getMenu', getMenu);
router.get('/getReservation', getReservation);
router.get('/getContact', getContact);
module.exports = router;
