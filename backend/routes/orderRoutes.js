const express = require('express');
const router = express.Router();
const  orderController  = require('../controllers/orderController');


router.post('/create-order', orderController.createOrder);

router.get('/order-status/:order_id', orderController.getOrderStatus);

module.exports = router;


