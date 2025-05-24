const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const dataRoutes = require('./routes/data');
const assistantRoutes = require('./routes/assistant');
const historicalEventsRoutes = require('./routes/historicalEvents');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/data', dataRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/historical-events', historicalEventsRoutes);

// Socket.io real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send initial data
  const sendUpdates = () => {
    const dataGenerator = require('./services/dataGenerator');
    socket.emit('prediction_update', dataGenerator.generatePrediction());
    socket.emit('parameter_update', {
      schumann: dataGenerator.generateSchumannData(),
      tec: dataGenerator.generateTECData(),
      elf: dataGenerator.generateELFData(),
      gravity: dataGenerator.generateGravityData()
    });
  };
  
  // Send initial data
  sendUpdates();
  
  // Set up interval for real-time updates (every 30 seconds)
  const updateInterval = setInterval(sendUpdates, 30000);
  
  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(updateInterval);
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server, io };
