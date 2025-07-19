// socketClient.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

// Handle document updates from server
socket.on('document:updated', (data) => {
    console.log('Received document update:', data);
    // We'll implement the state update in the next task
});

export default socket;
