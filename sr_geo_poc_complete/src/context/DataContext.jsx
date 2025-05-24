import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // State for all data
  const [prediction, setPrediction] = useState(null);
  const [parameters, setParameters] = useState({
    schumann: null,
    tec: null,
    elf: null,
    gravity: null
  });
  const [riskZones, setRiskZones] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [historicalEvents, setHistoricalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Connect to socket on component mount
  useEffect(() => {
    // Connect to the server
    const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for prediction updates
    socket.on('prediction_update', (data) => {
      setPrediction(data);
    });

    // Listen for parameter updates
    socket.on('parameter_update', (data) => {
      setParameters(data);
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('prediction_update');
      socket.off('parameter_update');
    };
  }, [socket]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          predictionRes, 
          schumannRes, 
          tecRes, 
          elfRes, 
          gravityRes,
          riskZonesRes,
          recentAlertsRes,
          historicalEventsRes
        ] = await Promise.all([
          axios.get('/api/data/prediction'),
          axios.get('/api/data/schumann'),
          axios.get('/api/data/tec'),
          axios.get('/api/data/elf'),
          axios.get('/api/data/gravity'),
          axios.get('/api/data/risk-zones'),
          axios.get('/api/data/recent-alerts'),
          axios.get('/api/historical-events')
        ]);
        
        // Update state with fetched data
        setPrediction(predictionRes.data);
        setParameters({
          schumann: schumannRes.data,
          tec: tecRes.data,
          elf: elfRes.data,
          gravity: gravityRes.data
        });
        setRiskZones(riskZonesRes.data);
        setRecentAlerts(recentAlertsRes.data);
        setHistoricalEvents(historicalEventsRes.data);
        
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fetch historical data with parameters
  const fetchHistoricalData = async (timeRange, selectedParameters) => {
    try {
      const response = await axios.get('/api/data/historical', {
        params: {
          timeRange,
          parameters: selectedParameters.join(',')
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching historical data:', err);
      throw new Error('Failed to load historical data');
    }
  };

  // Ask AI assistant
  const askAssistant = async (question) => {
    try {
      const response = await axios.post('/api/assistant/ask', { question });
      return response.data.response;
    } catch (err) {
      console.error('Error getting AI response:', err);
      throw new Error('Failed to get a response from the assistant');
    }
  };

  return (
    <DataContext.Provider
      value={{
        prediction,
        parameters,
        riskZones,
        recentAlerts,
        historicalEvents,
        loading,
        error,
        fetchHistoricalData,
        askAssistant
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
