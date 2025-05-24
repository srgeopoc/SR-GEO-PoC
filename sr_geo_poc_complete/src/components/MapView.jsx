import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, FeatureGroup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  // Get data from context
  const { 
    riskZones, 
    historicalEvents,
    loading, 
    error 
  } = useData();

  // State for filtering
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [showHistoricalEvents, setShowHistoricalEvents] = useState(false);
  const [filteredZones, setFilteredZones] = useState([]);

  // Filter zones based on selected risk level
  useEffect(() => {
    if (!riskZones) return;
    
    if (selectedRiskLevel === 'all') {
      setFilteredZones(riskZones);
    } else {
      const riskThresholds = {
        high: 0.8,
        medium: 0.4,
        low: 0.0
      };
      
      const maxThreshold = riskThresholds[selectedRiskLevel];
      const minThreshold = selectedRiskLevel === 'high' ? 0.8 : 
                          selectedRiskLevel === 'medium' ? 0.4 : 0.0;
      
      setFilteredZones(riskZones.filter(zone => {
        if (selectedRiskLevel === 'high') return zone.risk >= maxThreshold;
        if (selectedRiskLevel === 'medium') return zone.risk >= minThreshold && zone.risk < 0.8;
        if (selectedRiskLevel === 'low') return zone.risk >= minThreshold && zone.risk < 0.4;
        return true;
      }));
    }
  }, [selectedRiskLevel, riskZones]);

  // Risk color mapping function
  const getRiskColor = (risk) => {
    if (risk >= 0.8) return '#ff0000'; // Red for high risk
    if (risk >= 0.6) return '#ff9900'; // Orange for medium-high risk
    if (risk >= 0.4) return '#ffcc00'; // Yellow for medium risk
    if (risk >= 0.2) return '#99cc00'; // Light green for low-medium risk
    return '#00cc00'; // Green for low risk
  };

  // Risk opacity mapping function
  const getRiskOpacity = (risk) => {
    return 0.2 + (risk * 0.6); // Opacity between 0.2 and 0.8 based on risk
  };

  // Show loading state
  if (loading || !riskZones || riskZones.length === 0) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading risk zone data...</p>
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
      <h2>Earthquake Risk Map</h2>
      <p className="lead">This map shows potential earthquake risk zones based on SR-GEO-PoC analysis.</p>
      
      {/* Filter controls */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <label htmlFor="risk-filter" className="form-label">Filter by Risk Level:</label>
              <select 
                id="risk-filter" 
                className="form-select" 
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk Only (≥80%)</option>
                <option value="medium">Medium Risk Only (40-79%)</option>
                <option value="low">Low Risk Only (0-39%)</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="historical-events-switch"
                  checked={showHistoricalEvents}
                  onChange={() => setShowHistoricalEvents(!showHistoricalEvents)}
                />
                <label className="form-check-label" htmlFor="historical-events-switch">
                  Show Historical Events
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-container" style={{ height: '500px', width: '100%', marginBottom: '20px' }}>
        <MapContainer 
          center={[20, 0]} 
          zoom={2} 
          style={{ height: '100%', width: '100%' }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              />
            </LayersControl.BaseLayer>
            
            <LayersControl.Overlay checked name="Risk Zones">
              <FeatureGroup>
                {filteredZones.map(zone => (
                  <CircleMarker
                    key={zone.id}
                    center={[zone.lat, zone.lng]}
                    radius={zone.radius / 10}
                    pathOptions={{
                      fillColor: getRiskColor(zone.risk),
                      fillOpacity: getRiskOpacity(zone.risk),
                      color: getRiskColor(zone.risk),
                      weight: 1
                    }}
                  >
                    <Popup>
                      <div>
                        <h5>{zone.location}</h5>
                        <p>Risk Level: <strong style={{ color: getRiskColor(zone.risk) }}>{(zone.risk * 100).toFixed(1)}%</strong></p>
                        <p>Based on SR-GEO-PoC analysis of multiple parameters</p>
                        <p>
                          {zone.risk >= 0.8 ? 'Significant anomalies detected in Schumann Resonance, TEC, and ELF burst activity.' :
                           zone.risk >= 0.6 ? 'Elevated ELF burst activity and moderate TEC anomalies observed.' :
                           zone.risk >= 0.4 ? 'Moderate anomalies in multiple parameters indicate potential activity.' :
                           'Minor variations detected, continued monitoring recommended.'}
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </FeatureGroup>
            </LayersControl.Overlay>
            
            {showHistoricalEvents && historicalEvents && (
              <LayersControl.Overlay checked name="Historical Events">
                <FeatureGroup>
                  {historicalEvents.map((event, index) => (
                    <CircleMarker
                      key={index}
                      center={[
                        // Approximate coordinates based on location names
                        event.location.includes('Greece') ? 38.9 : 
                        event.location.includes('California') ? 37.7 : 
                        event.location.includes('Japan') ? 36.2 : 
                        event.location.includes('Italy') ? 42.5 : 
                        event.location.includes('Mexico') ? 19.4 : 
                        event.location.includes('Turkey') ? 39.9 : 
                        event.location.includes('Taiwan') ? 23.7 : 
                        0,
                        event.location.includes('Greece') ? 23.7 : 
                        event.location.includes('California') ? -122.4 : 
                        event.location.includes('Japan') ? 138.2 : 
                        event.location.includes('Italy') ? 12.5 : 
                        event.location.includes('Mexico') ? -99.1 : 
                        event.location.includes('Turkey') ? 32.8 : 
                        event.location.includes('Taiwan') ? 121.0 : 
                        0
                      ]}
                      radius={event.magnitude * 2}
                      pathOptions={{
                        fillColor: event.prediction ? '#4caf50' : '#f44336',
                        fillOpacity: 0.6,
                        color: event.prediction ? '#4caf50' : '#f44336',
                        weight: 1
                      }}
                    >
                      <Popup>
                        <div>
                          <h5>{event.location}</h5>
                          <p>Date: {event.date}</p>
                          <p>Magnitude: M{event.magnitude.toFixed(1)}</p>
                          <p>Prediction Score: {(event.score * 100).toFixed(0)}%</p>
                          <p>Outcome: <strong style={{ color: event.prediction ? '#4caf50' : '#f44336' }}>
                            {event.prediction ? 'Successfully Predicted' : 'Not Predicted'}
                          </strong></p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </FeatureGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>
        </MapContainer>
      </div>
      
      <div className="map-legend mt-3">
        <h5>Risk Level Legend</h5>
        <div className="row">
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#00cc00' }}></span> Low Risk (0-19%)</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#99cc00' }}></span> Low-Medium Risk (20-39%)</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span> Medium Risk (40-59%)</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#ff9900' }}></span> Medium-High Risk (60-79%)</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span> High Risk (80-100%)</div>
        </div>
        
        {showHistoricalEvents && (
          <div className="mt-3">
            <h5>Historical Events Legend</h5>
            <div className="row">
              <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#4caf50' }}></span> Successfully Predicted Event</div>
              <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#f44336' }}></span> Missed Event (Not Predicted)</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Current Risk Assessment</h5>
          <p>The map displays regions with elevated seismic risk based on the SR-GEO-PoC algorithm's analysis of multiple parameters:</p>
          <ul>
            {filteredZones.map(zone => (
              <li key={zone.id}>
                <strong>{zone.location} ({(zone.risk * 100).toFixed(0)}% risk):</strong> {
                  zone.risk >= 0.8 ? 'Significant anomalies detected in Schumann Resonance, TEC, and ELF burst activity.' :
                  zone.risk >= 0.6 ? 'Elevated ELF burst activity and moderate TEC anomalies observed.' :
                  zone.risk >= 0.4 ? 'Moderate anomalies in multiple parameters indicate potential activity.' :
                  'Minor variations detected, continued monitoring recommended.'
                }
              </li>
            ))}
          </ul>
          <p>Risk assessment is updated every 6 hours based on the latest parameter data.</p>
        </div>
      </div>
      
      <div className="attribution">
        <p>Based on SR-GEO-PoC Theory | DOI: <a href="https://doi.org/10.5281/zenodo.15380641" target="_blank" rel="noopener noreferrer">10.5281/zenodo.15380641</a> | <a href="https://zenodo.org/records/15477659" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
      </div>
    </div>
  );
};

export default MapView;
