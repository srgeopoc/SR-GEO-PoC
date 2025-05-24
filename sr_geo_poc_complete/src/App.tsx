import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Placeholder components - will be replaced with actual implementations
const Dashboard = () => <div>Dashboard Component</div>;
const MapView = () => <div>Map View Component</div>;
const ParameterAnalysis = () => <div>Parameter Analysis Component</div>;
const HistoricalData = () => <div>Historical Data Component</div>;
const AIAssistant = () => <div>AI Assistant Component</div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>SR-GEO-PoC Tracker</h1>
          <nav>
            <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/map">Map View</a></li>
              <li><a href="/parameters">Parameter Analysis</a></li>
              <li><a href="/historical">Historical Data</a></li>
              <li><a href="/assistant">AI Assistant</a></li>
            </ul>
          </nav>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/parameters" element={<ParameterAnalysis />} />
            <Route path="/historical" element={<HistoricalData />} />
            <Route path="/assistant" element={<AIAssistant />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>SR-GEO-PoC Tracker - Based on the Schumann Resonance Geophysical Energy Observation and Prediction Correlation theory</p>
          <p>DOI: <a href="https://doi.org/10.5281/zenodo.15380641">10.5281/zenodo.15380641</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
