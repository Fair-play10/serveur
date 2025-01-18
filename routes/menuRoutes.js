const express = require('express');
const { addMenuItem, fetchMenu } = require('../controllers/menuController');

const router = express.Router();

router.post('/', addMenuItem);
router.get('/', fetchMenu);

module.exports = router;
