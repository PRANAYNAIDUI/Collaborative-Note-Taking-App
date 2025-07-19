// src/TestComponent.js
import React from 'react';
import socket from './socketClient';

const TestComponent = () => {
    return (
        <div>
            <h1>Socket.io Test</h1>
            <button onClick={() => {
                socket.emit('test', 'Message from client');
            }}>
                Send Message
            </button>
        </div>
    );
};

export default TestComponent;
