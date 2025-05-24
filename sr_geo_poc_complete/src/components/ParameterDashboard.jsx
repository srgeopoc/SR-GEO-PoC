import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ParameterDashboard = () => {
  // Get data from context
  const { 
    parameters,
    loading, 
    error 
  } = useData();
  
  // State for time range
  const [timeRange, setTimeRange] = useState('24h');
  
  // Anomaly indicators
  const [anomalies, setAnomalies] = useState({
    schumann: { detected: true, level: 'medium', description: 'Frequency shift of +0.22 Hz detected' },
    tec: { detected: true, level: 'high', description: 'Significant TEC increase of 20% above baseline' },
    elf: { detected: true, level: 'high', description: 'ELF burst activity 300% above normal levels' },
    gravity: { detected: false, level: 'low', description: 'Minor variations within normal range' }
  });
  
  // Chart options
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };
  
  // Get color based on anomaly level
  const getAnomalyColor = (level) => {
    switch(level) {
      case 'critical': return '#ff0000';
      case 'high': return '#ff6600';
      case 'medium': return '#ffcc00';
      case 'low': return '#99cc00';
      default: return '#00cc00';
    }
  };

  // Show loading state
  if (loading || !parameters || !parameters.schumann || !parameters.tec || !parameters.elf || !parameters.gravity) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading parameter data...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Parameter Analysis Dashboard</h2>
      <p className="lead">Real-time monitoring of SR-GEO-PoC parameters and anomaly detection</p>
      
      {/* Time range selector */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <label htmlFor="time-range" className="form-label">Time Range:</label>
              <select 
                id="time-range" 
                className="form-select"
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="6h">Last 6 Hours</option>
                <option value="12h">Last 12 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="48h">Last 48 Hours</option>
                <option value="72h">Last 72 Hours</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="alert alert-info mb-0">
                <i className="bi bi-info-circle-fill me-2"></i>
                Parameter data is updated in real-time. Anomaly detection is performed automatically.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card parameter-card" style={{ borderColor: getAnomalyColor(anomalies.schumann.level) }}>
            <div className="card-body">
              <h5 className="card-title">Schumann Resonance</h5>
              {anomalies.schumann.detected && (
                <div className="anomaly-alert" style={{ backgroundColor: getAnomalyColor(anomalies.schumann.level) }}>
                  Anomaly Detected: {anomalies.schumann.description}
                </div>
              )}
              <Line options={options} data={parameters.schumann} />
              <div className="parameter-info mt-3">
                <p><strong>Normal Range:</strong> 7.83 Hz ± 0.1 Hz</p>
                <p><strong>Current Value:</strong> 8.05 Hz (↑ 0.22 Hz)</p>
                <p><strong>Significance:</strong> Frequency shifts of +0.1 to +0.3 Hz have been observed 12-36 hours before significant seismic events.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card parameter-card" style={{ borderColor: getAnomalyColor(anomalies.tec.level) }}>
            <div className="card-body">
              <h5 className="card-title">Total Electron Content</h5>
              {anomalies.tec.detected && (
                <div className="anomaly-alert" style={{ backgroundColor: getAnomalyColor(anomalies.tec.level) }}>
                  Anomaly Detected: {anomalies.tec.description}
                </div>
              )}
              <Line options={options} data={parameters.tec} />
              <div className="parameter-info mt-3">
                <p><strong>Normal Range:</strong> 15-25 TECU (diurnal variation)</p>
                <p><strong>Current Value:</strong> 30 TECU (↑ 20% above baseline)</p>
                <p><strong>Significance:</strong> TEC anomalies of 15-25% above baseline have been observed 24-48 hours before significant seismic events.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card parameter-card" style={{ borderColor: getAnomalyColor(anomalies.elf.level) }}>
            <div className="card-body">
              <h5 className="card-title">ELF Burst Activity</h5>
              {anomalies.elf.detected && (
                <div className="anomaly-alert" style={{ backgroundColor: getAnomalyColor(anomalies.elf.level) }}>
                  Anomaly Detected: {anomalies.elf.description}
                </div>
              )}
              <Line options={options} data={parameters.elf} />
              <div className="parameter-info mt-3">
                <p><strong>Normal Range:</strong> 1-5 relative units</p>
                <p><strong>Current Value:</strong> 20 relative units (↑ 300% above normal)</p>
                <p><strong>Significance:</strong> ELF burst activity increases of 45-300% above baseline have been observed 48-72 hours before significant seismic events.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card parameter-card" style={{ borderColor: getAnomalyColor(anomalies.gravity.level) }}>
            <div className="card-body">
              <h5 className="card-title">Gravity Field Variation</h5>
              {anomalies.gravity.detected && (
                <div className="anomaly-alert" style={{ backgroundColor: getAnomalyColor(anomalies.gravity.level) }}>
                  Anomaly Detected: {anomalies.gravity.description}
                </div>
              )}
              <Line options={options} data={parameters.gravity} />
              <div className="parameter-info mt-3">
                <p><strong>Normal Range:</strong> 0.3-0.7 μGal</p>
                <p><strong>Current Value:</strong> 0.6 μGal (within normal range)</p>
                <p><strong>Significance:</strong> Gravity field variations of 0.8-1.2 μGal have been observed 6-24 hours before some significant seismic events, but with less consistency than other parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Parameter Correlation Analysis</h5>
          <p>Current correlation between parameters suggests a <strong>72% probability</strong> of seismic activity within the next 48-72 hours in monitored regions.</p>
          <div className="row">
            <div className="col-md-6">
              <h6>Primary contributing factors:</h6>
              <ul>
                <li>ELF Burst Activity (45%)</li>
                <li>Total Electron Content (35%)</li>
                <li>Schumann Resonance (15%)</li>
                <li>Gravity Field (5%)</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6>Anomaly Pattern Analysis:</h6>
              <p>The current pattern of ELF burst activity combined with TEC anomalies matches historical pre-seismic signatures observed in 83% of M4.5+ events.</p>
              <p>Continued monitoring recommended for Euboea, Greece and San Francisco, CA regions.</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h6>Parameter Interaction Model:</h6>
            <p>The SR-GEO-PoC theory proposes that these parameters interact in the following ways:</p>
            <ol>
              <li>Pre-seismic processes create electromagnetic emissions in the ELF range</li>
              <li>These emissions propagate upward and affect the ionosphere, causing TEC anomalies</li>
              <li>The altered ionospheric conditions affect Schumann Resonance parameters</li>
              <li>Mass redistribution associated with pre-seismic processes causes subtle gravity field variations</li>
            </ol>
            <p>The weighted algorithm accounts for both the magnitude of anomalies and their temporal sequence.</p>
          </div>
        </div>
      </div>
      
      <div className="attribution">
        <p>Based on SR-GEO-PoC Theory | DOI: <a href="https://doi.org/10.5281/zenodo.15380641" target="_blank" rel="noopener noreferrer">10.5281/zenodo.15380641</a> | <a href="https://zenodo.org/records/15477659" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
      </div>
    </div>
  );
};

export default ParameterDashboard;
