const express = require('express');
const router = express.Router();

// Import data generation functions
const { 
  generateSchumannData,
  generateTECData,
  generateELFData,
  generateGravityData,
  generatePrediction,
  generateRiskZones,
  generateRecentAlerts,
  generateHistoricalData
} = require('../services/dataGenerator');

// Parameter data routes
router.get('/schumann', (req, res) => {
  res.json(generateSchumannData());
});

router.get('/tec', (req, res) => {
  res.json(generateTECData());
});

router.get('/elf', (req, res) => {
  res.json(generateELFData());
});

router.get('/gravity', (req, res) => {
  res.json(generateGravityData());
});

// Prediction and risk assessment routes
router.get('/prediction', (req, res) => {
  res.json(generatePrediction());
});

router.get('/risk-zones', (req, res) => {
  res.json(generateRiskZones());
});

router.get('/recent-alerts', (req, res) => {
  res.json(generateRecentAlerts());
});

// Historical data route
router.get('/historical', (req, res) => {
  const { timeRange, parameters } = req.query;
  res.json(generateHistoricalData(timeRange, parameters ? parameters.split(',') : null));
});

module.exports = router;
