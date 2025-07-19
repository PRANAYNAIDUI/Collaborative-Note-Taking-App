// socket.js
const io = require('socket.io')({
    cors: {
        origin: "http://localhost:3000", // Your React app URL
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A new client has connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client has disconnected');
    });
});

// Start the Socket.io server
const PORT = 8080;
io.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`);
});
