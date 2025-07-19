// DocumentEditor.jsx
import React, { useState, useEffect } from 'react';
import socket from './socketClient';

const DocumentEditor = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        
        // Send document update to server
        socket.emit('document:update', {
            id: 'your_document_id', // Replace with actual document ID
            content: newContent
        });
    };

    return (
        <div>
            <textarea 
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing..."
            />
        </div>
    );
};

export default DocumentEditor;
