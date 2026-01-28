const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Smart Ambulance Services API',
    status: 'Running',
    version: '1.0.0'
  });
});

// Socket.IO - Real-time tracking
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  // Ambulance location update
  socket.on('ambulanceLocationUpdate', (data) => {
    console.log('📍 Ambulance location updated:', data);
    // Broadcast to all clients
    io.emit('ambulanceLocationUpdate', data);
  });

  // Patient location update
  socket.on('patientLocationUpdate', (data) => {
    console.log('📍 Patient location updated:', data);
    io.emit('patientLocationUpdate', data);
  });

  // Booking status update
  socket.on('bookingStatusUpdate', (data) => {
    console.log('🚑 Booking status updated:', data);
    io.emit('bookingStatusUpdate', data);
  });

  // New booking notification
  socket.on('newBooking', (data) => {
    console.log('🆕 New booking created:', data);
    io.emit('newBooking', data);
  });

  // Join room for specific booking
  socket.on('joinBooking', (bookingId) => {
    socket.join(bookingId);
    console.log(`📱 User joined booking room: ${bookingId}`);
  });

  // Send message to specific booking room
  socket.on('bookingMessage', ({ bookingId, message }) => {
    io.to(bookingId).emit('bookingMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.IO ready for real-time connections`);
});

module.exports = { app, io };
