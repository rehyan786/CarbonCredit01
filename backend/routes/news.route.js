const express = require('express');
const router = express.Router();
const { getCarbonNews } = require('../controllers/news.controller');

router.get('/carbon-global', getCarbonNews);

module.exports = router;
