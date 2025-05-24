const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated data generation functions
const generateSchumannData = () => {
  const baseFrequency = 7.83;
  const hourlyData = [];
  
  for (let i = 0; i < 24; i++) {
    // Create realistic variations with a slight upward trend
    const variation = (Math.random() * 0.1) - 0.05;
    const trendFactor = i / 100; // Slight upward trend
    hourlyData.push((baseFrequency + variation + trendFactor).toFixed(2));
  }
  
  return {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Schumann Resonance (7.83 Hz)',
        data: hourlyData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };
};

const generateTECData = () => {
  const baseTEC = 20;
  const hourlyData = [];
  
  for (let i = 0; i < 24; i++) {
    // Create realistic diurnal pattern with peak during day
    const timeOfDay = Math.sin((i - 6) * Math.PI / 12) * 10;
    const variation = (Math.random() * 4) - 2;
    hourlyData.push(Math.max(5, Math.round(baseTEC + timeOfDay + variation)));
  }
  
  return {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Total Electron Content (TECU)',
        data: hourlyData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };
};

const generateELFData = () => {
  const baseELF = 5;
  const hourlyData = [];
  
  for (let i = 0; i < 24; i++) {
    // Create pattern with significant anomaly
    let value = baseELF + (Math.random() * 3) - 1.5;
    
    // Add anomaly spike in the middle of the day
    if (i >= 10 && i <= 14) {
      value += 10 * Math.sin((i - 10) * Math.PI / 4);
    }
    
    hourlyData.push(Math.max(1, Math.round(value)));
  }
  
  return {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'ELF Burst Activity (Relative Units)',
        data: hourlyData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };
};

const generateGravityData = () => {
  const baseGravity = 0.5;
  const hourlyData = [];
  
  for (let i = 0; i < 24; i++) {
    // Create subtle variations
    const variation = (Math.random() * 0.2) - 0.1;
    
    // Add slight trend
    const trend = i / 100;
    
    hourlyData.push((baseGravity + variation + trend).toFixed(1));
  }
  
  return {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Gravity Field Variation (μGal)',
        data: hourlyData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.3,
      },
    ],
  };
};

// Generate prediction score based on parameter data
const generatePrediction = () => {
  // Base risk with some randomness
  const baseRisk = 0.65 + (Math.random() * 0.15);
  
  // Contributing factors with some variation
  const schumannFactor = 0.15 + (Math.random() * 0.05);
  const tecFactor = 0.35 + (Math.random() * 0.05);
  const elfFactor = 0.45 + (Math.random() * 0.05);
  const gravityFactor = 0.05 + (Math.random() * 0.02);
  
  // Normalize factors to sum to 1
  const total = schumannFactor + tecFactor + elfFactor + gravityFactor;
  const normalizedSchumann = schumannFactor / total;
  const normalizedTEC = tecFactor / total;
  const normalizedELF = elfFactor / total;
  const normalizedGravity = gravityFactor / total;
  
  return {
    score: baseRisk,
    confidence: 0.75 + (Math.random() * 0.2),
    alertLevel: baseRisk >= 0.8 ? 'critical' : baseRisk >= 0.6 ? 'high' : baseRisk >= 0.4 ? 'medium' : 'low',
    timestamp: new Date().toISOString(),
    contributingFactors: {
      schumannResonance: normalizedSchumann,
      totalElectronContent: normalizedTEC,
      elfBurstActivity: normalizedELF,
      gravityField: normalizedGravity
    }
  };
};

// Generate risk zones for map
const generateRiskZones = () => {
  return [
    { id: 1, lat: 37.7749, lng: -122.4194, risk: 0.8, radius: 50, location: 'San Francisco, CA' },
    { id: 2, lat: 34.0522, lng: -118.2437, risk: 0.6, radius: 40, location: 'Los Angeles, CA' },
    { id: 3, lat: 40.7128, lng: -74.0060, risk: 0.3, radius: 30, location: 'New York, NY' },
    { id: 4, lat: 38.9072, lng: 23.7362, risk: 0.9, radius: 60, location: 'Euboea, Greece' },
  ];
};

// Generate recent alerts
const generateRecentAlerts = () => {
  return [
    { region: 'Euboea, Greece', score: 0.92, timestamp: '2025-05-18T08:30:00Z', status: 'Verified' },
    { region: 'San Francisco, CA', score: 0.78, timestamp: '2025-05-22T14:15:00Z', status: 'Active' },
    { region: 'Los Angeles, CA', score: 0.65, timestamp: '2025-05-22T16:45:00Z', status: 'Active' },
    { region: 'Tokyo, Japan', score: 0.58, timestamp: '2025-05-21T22:10:00Z', status: 'Expired' },
  ];
};

// API Routes
app.get('/api/data/schumann', (req, res) => {
  res.json(generateSchumannData());
});

app.get('/api/data/tec', (req, res) => {
  res.json(generateTECData());
});

app.get('/api/data/elf', (req, res) => {
  res.json(generateELFData());
});

app.get('/api/data/gravity', (req, res) => {
  res.json(generateGravityData());
});

app.get('/api/prediction', (req, res) => {
  res.json(generatePrediction());
});

app.get('/api/risk-zones', (req, res) => {
  res.json(generateRiskZones());
});

app.get('/api/recent-alerts', (req, res) => {
  res.json(generateRecentAlerts());
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
