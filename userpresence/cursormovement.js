// components/DocumentEditor.js
import React, { useState, useEffect } from 'react';
import { useEditor, useInsertionPosition } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UserPresence from './UserPresence';

const DocumentEditor = ({ documentId, users }) => {
  const [editor, setEditor] = useEditor({
    extensions: [StarterKit],
    content: '<p>Start typing...</p>',
    onUpdate: ({ editor }) => {
      // Handle content updates
    },
  });

  const [cursorPositions, setCursorPositions] = useState({});
  const insertionPosition = useInsertionPosition(editor);

  useEffect(() => {
    const handleCursorPosition = (userId, position) => {
      setCursorPositions(prev => ({
        ...prev,
        [userId]: position
      }));
    };

    // Listen for cursor position updates from WebSocket
    window.socket.on('cursor-position', handleCursorPosition);

    return () => {
      window.socket.off('cursor-position');
    };
  }, []);

  // Create a plugin to display other users' cursors
  const cursorPlugin = {
    addOptions() {
      return {
        cursorColor: '#ff0000', // Default cursor color
      };
    },

    onUpdate(props) {
      // Update cursor positions when editor content changes
    },

    onTransaction(props, transaction) {
      // Handle transactions
    },

    addClientListeners(props) {
      if (!props.client) {
        return;
      }

      props.client.on('transaction', (transaction) => {
        // Update cursor positions based on transactions
      });
    },
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <div className="editor-sidebar">
        <UserPresence users={users} />
      </div>
      <div className="editor-content">
        <div className="editor">
          {editor.getHTML()}
          {Object.entries(cursorPositions).map(([userId, position]) => (
            <div
              key={userId}
              className="cursor"
              style={{
                position: 'absolute',
                left: `${position.clientX}px`,
                top: `${position.clientY}px`,
                width: '2px',
                height: '20px',
                backgroundColor: users.find(u => u.id === userId)?.color,
                zIndex: 1,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
