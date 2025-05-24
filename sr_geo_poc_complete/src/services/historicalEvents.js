// Generate historical events data
const generateHistoricalEvents = () => {
  return [
    { date: '2025-05-18', magnitude: 4.5, location: 'Euboea, Greece', prediction: true, score: 0.92 },
    { date: '2025-04-10', magnitude: 5.2, location: 'Central California', prediction: true, score: 0.76 },
    { date: '2025-03-22', magnitude: 4.8, location: 'Southern Greece', prediction: true, score: 0.82 },
    { date: '2025-03-05', magnitude: 6.1, location: 'Northern Japan', prediction: true, score: 0.91 },
    { date: '2025-02-18', magnitude: 4.5, location: 'Central Italy', prediction: false, score: 0.32 },
    { date: '2025-02-03', magnitude: 5.7, location: 'Southern Mexico', prediction: true, score: 0.79 },
    { date: '2025-01-15', magnitude: 4.9, location: 'Western Turkey', prediction: true, score: 0.85 },
    { date: '2024-12-28', magnitude: 4.7, location: 'Northern California', prediction: false, score: 0.45 },
    { date: '2024-12-12', magnitude: 5.3, location: 'Eastern Taiwan', prediction: true, score: 0.88 },
    { date: '2024-11-30', magnitude: 4.6, location: 'Southern Italy', prediction: true, score: 0.71 }
  ];
};

module.exports = { generateHistoricalEvents };
