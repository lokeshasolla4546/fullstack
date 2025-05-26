const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, controller.placeOrder); // Place new order
router.get('/', authenticate, controller.getOrders);   // View order history

module.exports = router;
