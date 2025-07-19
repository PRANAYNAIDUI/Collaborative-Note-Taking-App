// DocumentEditor.js
import React, { useState, useEffect } from 'react';
import { getDocumentUpdates } from './socketClient';
import { Document } from './models/Document';

export default function DocumentEditor({ match }) {
    const [document, setDocument] = useState(new Document());
    const docId = match.params.id;

    useEffect(() => {
        getDocumentUpdates(docId, (updatedDocument) => {
            setDocument(updatedDocument);
        });
    }, [docId]);

    const handleContentChange = (content) => {
        const updatedDoc = { ...document, content };
        // Emit the update to the server
        socket.emit('documentUpdate', updatedDoc);
    };

    return (
        <div className="editor-container">
            <textarea
                value={document.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="document-editor"
            />
        </div>
    );
}
