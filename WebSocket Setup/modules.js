// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create Express app
const app = express();

// Set up middleware
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your React application URL
        methods: ["GET", "POST"]
    }
});

// Store connected users
let connectedUsers = new Map();

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A new client has connected');

    // Handle user joining
    socket.on('join', (userId) => {
        connectedUsers.set(socket.id, userId);
        console.log(`User ${userId} joined with socket ID ${socket.id}`);
        
        // Broadcast updated user list
        io.emit('userList', Array.from(connectedUsers.values()));
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        connectedUsers.delete(socket.id);
        console.log('A client has disconnected');
        
        // Broadcast updated user list after someone leaves
        io.emit('userList', Array.from(connectedUsers.values()));
    });
});

// Start HTTP server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
