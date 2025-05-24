import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  // State for risk zones data
  const [riskZones, setRiskZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch risk zones data from API
  useEffect(() => {
    const fetchRiskZones = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/risk-zones');
        setRiskZones(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching risk zones:', err);
        setError('Failed to load risk zone data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchRiskZones();
    
    // Set up interval to refresh data every 10 minutes
    const interval = setInterval(fetchRiskZones, 600000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

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
  if (loading && riskZones.length === 0) {
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
  if (error && riskZones.length === 0) {
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
      
      <div className="map-container">
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
              <>
                {riskZones.map(zone => (
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
                        <p>Risk Level: {(zone.risk * 100).toFixed(1)}%</p>
                        <p>Based on SR-GEO-PoC analysis of multiple parameters</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
      
      <div className="map-legend mt-3">
        <h5>Risk Level Legend</h5>
        <div className="row">
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#00cc00' }}></span> Low Risk</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#99cc00' }}></span> Low-Medium Risk</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span> Medium Risk</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#ff9900' }}></span> Medium-High Risk</div>
          <div className="col legend-item"><span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span> High Risk</div>
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Current Risk Assessment</h5>
          <p>The map displays regions with elevated seismic risk based on the SR-GEO-PoC algorithm's analysis of multiple parameters:</p>
          <ul>
            {riskZones.map(zone => (
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
