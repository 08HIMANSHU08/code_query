const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();


router.post('/add', cartController.addToCart);

router.post('/checkout', cartController.cartCheckout);

router.get('/:id',cartController.getUserCart);


module.exports = router;