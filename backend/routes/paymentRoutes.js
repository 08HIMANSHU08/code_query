const express = require('express');
const router = express.Router();
const { initiatePayment,paymentWebhook, paymentSuccess } = require('../controllers/paymentController');

router.post('/initiate-payment', initiatePayment);

router.post('/payment-webhook', paymentWebhook);

router.get('/success', paymentSuccess);

module.exports = router;
