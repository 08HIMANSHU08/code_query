const express = require('express');
const router = express.Router();
const getServices = require('../controllers/serviceController');

router.get('/ac', getServices);

module.exports = router;
