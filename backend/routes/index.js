const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonController');

router.get('/', (req, res) => {
  res.send('Welcome to the Carbon Credits API');
});

// Carbon prices routes
router.get('/api/carbon-prices', carbonController.getCarbonPrices);
router.post('/api/carbon-prices', carbonController.addCarbonMarketData);
router.get('/api/carbon-prices/history', carbonController.getHistoricalData);

module.exports = router;
