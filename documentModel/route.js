// routes/documents.router.js
const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    const newDocument = new Document({
      title,
      content,
      userId,
      collaborators: [userId]
    });

    const savedDocument = await newDocument.save();

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Failed to create document' });
  }
});

module.exports = router;
