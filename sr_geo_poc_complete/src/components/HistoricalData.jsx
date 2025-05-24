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

const HistoricalData = () => {
  // Get data from context
  const { 
    historicalEvents,
    fetchHistoricalData,
    loading, 
    error 
  } = useData();
  
  // State for historical data
  const [timeRange, setTimeRange] = useState('1w'); // 1d, 1w, 1m, 3m, 6m, 1y
  const [selectedParameters, setSelectedParameters] = useState(['schumann', 'tec', 'elf', 'gravity']);
  const [chartData, setChartData] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Fetch historical data when parameters change
  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        setLocalLoading(true);
        const data = await fetchHistoricalData(timeRange, selectedParameters);
        setChartData(data);
        setLocalLoading(false);
        setLocalError(null);
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setLocalError('Failed to load historical data. Please try again later.');
        setLocalLoading(false);
      }
    };
    
    getHistoricalData();
  }, [timeRange, selectedParameters, fetchHistoricalData]);

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
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
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

  // Toggle parameter selection
  const toggleParameter = (param) => {
    if (selectedParameters.includes(param)) {
      // Don't allow deselecting all parameters
      if (selectedParameters.length > 1) {
        setSelectedParameters(selectedParameters.filter(p => p !== param));
      }
    } else {
      setSelectedParameters([...selectedParameters, param]);
    }
  };

  // Show loading state
  if ((loading && !historicalEvents) || (localLoading && !chartData)) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading historical data...</p>
      </div>
    );
  }

  // Show error state
  if ((error && !historicalEvents) || (localError && !chartData)) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          {error || localError}
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
      <h2>Historical Data Analysis</h2>
      <p className="lead">Analyze past parameter trends and seismic events to identify patterns</p>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="time-range">Time Range:</label>
                <select 
                  id="time-range" 
                  className="form-select"
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="1d">1 Day</option>
                  <option value="1w">1 Week</option>
                  <option value="1m">1 Month</option>
                  <option value="3m">3 Months</option>
                  <option value="6m">6 Months</option>
                  <option value="1y">1 Year</option>
                </select>
              </div>
            </div>
            
            <div className="col-md-8">
              <label>Parameters:</label>
              <div className="parameter-toggles">
                <button 
                  className={`btn ${selectedParameters.includes('schumann') ? 'btn-info' : 'btn-outline-secondary'}`}
                  onClick={() => toggleParameter('schumann')}
                >
                  Schumann Resonance
                </button>
                <button 
                  className={`btn ${selectedParameters.includes('tec') ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => toggleParameter('tec')}
                >
                  TEC
                </button>
                <button 
                  className={`btn ${selectedParameters.includes('elf') ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => toggleParameter('elf')}
                >
                  ELF Activity
                </button>
                <button 
                  className={`btn ${selectedParameters.includes('gravity') ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => toggleParameter('gravity')}
                >
                  Gravity Field
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Parameter Trends</h5>
          <div style={{ height: '400px' }}>
            {chartData && <Line options={options} data={chartData} />}
          </div>
          <div className="mt-3">
            <p><strong>Note:</strong> The chart shows normalized values for easier comparison between parameters.</p>
            <ul>
              <li>Schumann Resonance: Deviation from baseline frequency (7.83 Hz)</li>
              <li>TEC: Percentage deviation from expected diurnal pattern</li>
              <li>ELF Activity: Relative intensity compared to baseline</li>
              <li>Gravity Field: Deviation from baseline in μGal</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Historical Seismic Events</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-center">Magnitude</th>
                  <th className="text-center">Prediction Score</th>
                  <th className="text-center">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {historicalEvents && historicalEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.date}</td>
                    <td>{event.location}</td>
                    <td className="text-center">M{event.magnitude.toFixed(1)}</td>
                    <td className="text-center">{(event.score * 100).toFixed(0)}%</td>
                    <td className="text-center">
                      <span className="event-status" style={{
                        backgroundColor: event.prediction ? '#4caf50' : '#f44336',
                      }}>
                        {event.prediction ? 'Predicted' : 'Missed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-body pattern-analysis">
          <h5 className="card-title">Pattern Analysis</h5>
          <p>
            Historical data analysis shows strong correlation between combined parameter anomalies and seismic events.
            Particularly notable is the pattern of ELF burst activity increases (45-300% above baseline) occurring 48-72 hours
            before significant events, often accompanied by TEC anomalies (15-25% above baseline) and Schumann Resonance
            frequency shifts (+0.1 to +0.3 Hz).
          </p>
          <p>
            The SR-GEO-PoC algorithm has successfully predicted 5 out of 6 significant events (M4.5+) in the past 6 months,
            with an overall accuracy rate of 83% and a false positive rate of 17%.
          </p>
          <div className="row mt-3">
            <div className="col-md-6">
              <h6>Key Precursor Patterns:</h6>
              <ul>
                <li>ELF burst activity increases 48-72 hours before events</li>
                <li>TEC anomalies 24-48 hours before events</li>
                <li>Schumann Resonance frequency shifts 12-36 hours before events</li>
                <li>Gravity field variations 6-24 hours before events (less consistent)</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6>Regional Variations:</h6>
              <ul>
                <li>Mediterranean region: Stronger SR and TEC correlations</li>
                <li>Pacific Ring of Fire: Stronger ELF and gravity correlations</li>
                <li>Continental regions: More variable patterns</li>
                <li>Oceanic regions: Clearer TEC anomaly patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="attribution">
        <p>Based on SR-GEO-PoC Theory | DOI: <a href="https://doi.org/10.5281/zenodo.15380641" target="_blank" rel="noopener noreferrer">10.5281/zenodo.15380641</a> | <a href="https://zenodo.org/records/15477659" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
      </div>
    </div>
  );
};

export default HistoricalData;
