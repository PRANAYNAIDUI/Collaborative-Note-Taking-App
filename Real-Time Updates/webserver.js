// socketServer.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your React application URL
        methods: ["GET", "POST"]
    }
});

// Store active sockets for broadcasting
const sockets = {};

// Handle new connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Store socket.id in sockets object
    sockets[socket.id] = socket;

    // Handle document change event
    socket.on('document:update', (data) => {
        console.log('Document updated:', data);
        
        // Broadcast the updated document to all connected clients
        io.emit('document:updated', data);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        delete sockets[socket.id];
        console.log('Client disconnected');
    });
});

// Start HTTP server
const PORT = 3001; // Assuming your React app runs on 3000
server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});
