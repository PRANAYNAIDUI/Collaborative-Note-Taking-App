// socket.js
io.on('connection', (socket) => {
    console.log('A new client has connected');
    
    socket.on('test', (message) => {
        console.log('Received message:', message);
        // Broadcast the message to all connected clients
        io.emit('test', message);
    });

    socket.on('disconnect', () => {
        console.log('A client has disconnected');
    });
});
