// routes/documents.js
const express = require('express');
const router = express.Router();
const checkPermissions = require('../middleware/checkPermissions');

// For read access
router.get('/:documentId', checkPermissions, async (req, res) => {
  try {
    const document = await Document.findById(req.params.documentId);
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// For write access (update)
router.put('/:documentId', checkPermissions, async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.documentId,
      { $set: { content: req.body.content } },
      { new: true }
    );
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// For delete access
router.delete('/:documentId', checkPermissions, async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.documentId);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});