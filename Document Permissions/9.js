// client/src/components/DocumentEditor.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const DocumentEditor = ({ match }) => {
    const [content, setContent] = useState('');
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        const documentId = match.params.id;
        
        // Join the document room
        socket.emit('join-document', { documentId, userId: localStorage.userId });

        // Listen for document updates
        socket.on('document-updated', ({ content, lastUpdatedBy }) => {
            setContent(content);
        });

        // Listen for user joins
        socket.on('user-joined', (user) => {
            setUsers(prev => [...prev, user]);
        });

        // Listen for permission updates
        socket.on('permissions-updated', (newPermissions) => {
            setPermissions(newPermissions);
        });

        return () => {
            socket.emit('leave-document', { documentId, userId: localStorage.userId });
        };
    }, [match.params.id]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
        socket.emit('document:update', {
            documentId: match.params.id,
            content: newContent,
            userId: localStorage.userId
        });
    };

    const handlePermissionChange = (newPermissions) => {
        socket.emit('update-permissions', {
            documentId: match.params.id,
            permissions: newPermissions,
            userId: localStorage.userId
        });
    };

    return (
        <div className="editor-container">
            <div className="users-list">
                <h3>Users in this document:</h3>
                {users.map(user => (
                    <div key={user.userId}>{user.username}</div>
                ))}
            </div>
            <div className="editor">
                <textarea
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    disabled={!hasEditPermission(permissions, localStorage.userId)}
                />
            </div>
            <div className="permissions-controls">
                <select
                    value={permissions}
                    onChange={(e) => handlePermissionChange(e.target.value)}
                    disabled={!isOwner(permissions, localStorage.userId)}
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="collaborative">Collaborative</option>
                </select>
            </div>
        </div>
    );
};

export default DocumentEditor;