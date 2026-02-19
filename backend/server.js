
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/database');
const communitySocket = require('./sockets/community.socket');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Setup CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"]
  }
});
communitySocket(io);

// API Routes
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to SPEI Backend API" });
});
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/emails', require('./routes/email.routes'));
app.use('/api/opportunities', require('./routes/opportunity.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/community', require('./routes/community.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server, io };
