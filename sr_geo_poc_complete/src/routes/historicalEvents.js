const express = require('express');
const router = express.Router();
const { generateHistoricalEvents } = require('../services/historicalEvents');

// Historical events route
router.get('/', (req, res) => {
  res.json(generateHistoricalEvents());
});

module.exports = router;
