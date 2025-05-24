import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import ParameterDashboard from './components/ParameterDashboard';
import HistoricalData from './components/HistoricalData';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/parameters" element={<ParameterDashboard />} />
            <Route path="/historical" element={<HistoricalData />} />
            <Route path="/assistant" element={<AIAssistant />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
