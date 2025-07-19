// server/index.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Assuming you have a route to update documents
app.put('/api/documents/:id', async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Emit the document update event to all connected clients
    io.emit('document:update', updatedDocument);

    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document' });
  }
});
