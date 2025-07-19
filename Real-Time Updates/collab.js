// DocumentEditor.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const DocumentEditor = ({ match }) => {
  const [documentContent, setDocumentContent] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io('http://localhost:3001');

    // Join the document room
    socketIo.on('connect', () => {
      socketIo.emit('joinDocument', match.params.documentId);
    });

    // Listen for document updates
    socketIo.on('documentUpdated', (data) => {
      setDocumentContent(data.content);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [match.params.documentId]);

  const handleContentChange = (content) => {
    setDocumentContent(content);
    // Emit the update event to the server
    socket.emit('updateDocument', {
      documentId: match.params.documentId,
      content: content,
    });
  };

  return (
    <div className="document-editor">
      <textarea
        value={documentContent}
        onChange={(e) => handleContentChange(e.target.value)}
        className="document-content"
      />
    </div>
  );
};

export default DocumentEditor;
