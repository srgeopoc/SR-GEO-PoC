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

// Generate historical data
const generateHistoricalData = (timeRange = '1w', parameters = null) => {
  // Default to all parameters if none specified
  const paramList = parameters || ['schumann', 'tec', 'elf', 'gravity'];
  
  // Generate dates for the selected time range
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    let days = 7; // default to 1 week
    
    switch(timeRange) {
      case '1d': days = 1; break;
      case '1w': days = 7; break;
      case '1m': days = 30; break;
      case '3m': days = 90; break;
      case '6m': days = 180; break;
      case '1y': days = 365; break;
      default: days = 7;
    }
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const dates = generateDates();
  
  // Generate random data with some patterns
  const generateParameterData = (baseline, variance, trend = 0) => {
    return dates.map((_, index) => {
      return baseline + (Math.random() * variance * 2 - variance) + (trend * index / dates.length);
    });
  };
  
  const datasets = [];
  
  if (paramList.includes('schumann')) {
    datasets.push({
      label: 'Schumann Resonance (Hz)',
      data: generateParameterData(7.83, 0.2, 0.1),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.3,
    });
  }
  
  if (paramList.includes('tec')) {
    datasets.push({
      label: 'Total Electron Content (TECU)',
      data: generateParameterData(25, 10, 5),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.3,
    });
  }
  
  if (paramList.includes('elf')) {
    datasets.push({
      label: 'ELF Burst Activity (Relative Units)',
      data: generateParameterData(5, 5, 8),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.3,
    });
  }
  
  if (paramList.includes('gravity')) {
    datasets.push({
      label: 'Gravity Field Variation (μGal)',
      data: generateParameterData(0.5, 0.5, 0.8),
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      tension: 0.3,
    });
  }
  
  return {
    labels: dates,
    datasets
  };
};

// Generate historical events
const generateHistoricalEvents = () => {
  return [
    { date: '2025-04-10', magnitude: 5.2, location: 'Central California', prediction: true, score: 0.76 },
    { date: '2025-03-22', magnitude: 4.8, location: 'Southern Greece', prediction: true, score: 0.82 },
    { date: '2025-03-05', magnitude: 6.1, location: 'Northern Japan', prediction: true, score: 0.91 },
    { date: '2025-02-18', magnitude: 4.5, location: 'Central Italy', prediction: false, score: 0.32 },
    { date: '2025-02-03', magnitude: 5.7, location: 'Southern Mexico', prediction: true, score: 0.79 },
    { date: '2025-01-15', magnitude: 4.9, location: 'Western Turkey', prediction: true, score: 0.85 },
  ];
};

module.exports = {
  generateSchumannData,
  generateTECData,
  generateELFData,
  generateGravityData,
  generatePrediction,
  generateRiskZones,
  generateRecentAlerts,
  generateHistoricalData,
  generateHistoricalEvents
};
