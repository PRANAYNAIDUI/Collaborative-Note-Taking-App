// In your DocumentEditor component
function handleCursorMove(e) {
    const { activeElement } = e;
    if (activeElement && activeElement.selectionStart !== undefined) {
        const selectionStart = activeElement.selectionStart;
        const selectionEnd = activeElement.selectionEnd;
        // Send these positions via WebSocket
        socket.emit('cursorUpdate', {
            documentId: currentDocument._id,
            userId: user._id,
            selectionStart,
            selectionEnd,
            userName: user.name
        });
    }
}

return (
    <div 
        className="editor-content"
        onSelectionChange={handleCursorMove}
        contentEditable={true}
    >
        {documentContent}
    </div>
);
