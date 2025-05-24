const express = require('express');
const router = express.Router();

// AI Assistant response generation
router.post('/ask', (req, res) => {
  const { question } = req.body;
  
  // Predefined responses based on keywords in the user message
  let response = '';
  
  if (question.toLowerCase().includes('sr-geo-poc') || question.toLowerCase().includes('theory')) {
    response = `The SR-GEO-PoC (Schumann Resonance Geophysical Energy Observation and Prediction Correlation) theory is a multi-parameter approach to earthquake prediction that integrates several geophysical measurements:

1. Schumann Resonance patterns - electromagnetic resonances in Earth's ionospheric cavity
2. Total Electron Content (TEC) anomalies in the ionosphere
3. Extremely Low Frequency (ELF) burst activity
4. Gravity field shifts

The theory proposes that these parameters, when analyzed together using a weighted scoring algorithm, can provide early warning of potential seismic events 48-72 hours before they occur. The current implementation has demonstrated an 83% accuracy rate in predicting M4.5+ events.`;
  } 
  else if (question.toLowerCase().includes('algorithm') || question.toLowerCase().includes('work')) {
    response = `The SR-GEO-PoC prediction algorithm works by:

1. Continuously monitoring four key parameters (Schumann Resonance, TEC, ELF activity, and gravity field variations)
2. Detecting anomalies in each parameter compared to baseline values
3. Applying a weighted scoring system where each parameter contributes differently to the final prediction score
4. Correlating the combined anomaly patterns with historical pre-seismic signatures
5. Generating a probability score and confidence level for potential seismic activity

The current weighting assigns approximately 45% to ELF burst activity, 35% to TEC anomalies, 15% to Schumann Resonance patterns, and 5% to gravity field variations, based on their historical correlation with seismic events.`;
  }
  else if (question.toLowerCase().includes('anomal') || question.toLowerCase().includes('current')) {
    response = `The current anomalies detected by the system indicate elevated seismic risk in several regions:

1. Euboea, Greece (90% risk): We're seeing significant anomalies across multiple parameters, particularly:
   - ELF burst activity 300% above normal levels
   - TEC increase of 20% above baseline
   - Schumann Resonance frequency shift of +0.22 Hz

2. San Francisco, CA (80% risk): Showing elevated ELF burst activity and moderate TEC anomalies.

These patterns match historical pre-seismic signatures observed before M4.5+ events with 83% accuracy. The system predicts a 72% probability of significant seismic activity within the next 48-72 hours in these monitored regions.`;
  }
  else if (question.toLowerCase().includes('schumann') || question.toLowerCase().includes('resonance')) {
    response = `Schumann Resonances are global electromagnetic resonances generated and excited by lightning discharges in the cavity formed by the Earth's surface and the ionosphere.

In the SR-GEO-PoC theory, Schumann Resonance (SR) is monitored for several key indicators:

1. Frequency shifts: The fundamental SR frequency is normally around 7.83 Hz, but pre-seismic activity can cause shifts of +0.1 to +0.3 Hz
2. Amplitude variations: Unusual increases in amplitude can indicate ionospheric disturbances
3. Spectral characteristics: Changes in the resonance patterns across multiple harmonics

Research suggests that pre-seismic electromagnetic phenomena can affect the Earth-ionosphere cavity, causing detectable changes in SR parameters 12-36 hours before significant seismic events. The current system shows a Schumann Resonance frequency shift of +0.22 Hz, which contributes to the elevated risk assessment.`;
  }
  else if (question.toLowerCase().includes('accurate') || question.toLowerCase().includes('accuracy')) {
    response = `The SR-GEO-PoC prediction system has demonstrated the following accuracy metrics based on historical data:

1. Overall accuracy rate: 83% for M4.5+ events
2. False positive rate: 17%
3. Detection window: 48-72 hours before events

In the past 6 months, the system successfully predicted 5 out of 6 significant seismic events (M4.5+). The accuracy varies by region:

- Mediterranean region: 87% accuracy
- Pacific Ring of Fire: 81% accuracy
- Continental regions: 76% accuracy

It's important to note that earthquake prediction remains challenging, and while the SR-GEO-PoC approach shows promising results, it should be considered as one tool among many for seismic risk assessment. The system continues to improve as more data is collected and the algorithm is refined.`;
  }
  else if (question.toLowerCase().includes('region') || question.toLowerCase().includes('risk')) {
    response = `Based on current SR-GEO-PoC analysis, the following regions show elevated seismic risk:

1. Euboea, Greece (90% risk): Significant anomalies detected in Schumann Resonance, TEC, and ELF burst activity.

2. San Francisco, CA (80% risk): Elevated ELF burst activity and moderate TEC anomalies observed.

3. Los Angeles, CA (60% risk): Moderate anomalies in multiple parameters indicate potential activity.

4. New York, NY (30% risk): Minor variations detected, continued monitoring recommended.

The system updates risk assessments every 6 hours based on the latest parameter data. The highest risk is currently in the Euboea region of Greece, where multiple parameters show significant anomalies consistent with pre-seismic patterns observed before previous M4.5+ events.`;
  }
  else {
    response = `I don't have specific information about that, but I'd be happy to explain more about the SR-GEO-PoC theory, the prediction algorithm, current anomalies, or any of the parameters being monitored. You can also ask about the accuracy of predictions or regions currently at risk.`;
  }
  
  // Simulate processing delay
  setTimeout(() => {
    res.json({ response });
  }, 500);
});

module.exports = router;
