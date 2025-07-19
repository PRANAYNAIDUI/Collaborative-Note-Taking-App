// In your DocumentEditor component
const [cursors, setCursors] = useState({});

// Listen for cursor updates
socket.on('cursorUpdate', (data) => {
    setCursors(prevCursors => ({
        ...prevCursors,
        [data.userId]: {
            selectionStart: data.selectionStart,
            selectionEnd: data.selectionEnd,
            userName: data.userName
        }
    }));
});

// Render cursor indicators
return (
    <div className="editor-container">
        <div className="editor-content" contentEditable={true}>
            {documentContent}
            {/* Render all cursors */}
            {Object.entries(cursors).map(([userId, cursor]) => (
                <div
                    key={userId}
                    className="cursor-indicator"
                    style={{
                        position: 'absolute',
                        left: `${cursor.selectionStart}px`,
                        top: `${cursor.selectionEnd}px`,
                        backgroundColor: '#ff0000',
                        width: '2px',
                        height: '20px'
                    }}
                >
                    <div className="cursor-tooltip">
                        {cursor.userName}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
