// models/Document.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Document'
  },
  content: {
    type: String,
    required: true,
    default: ''
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number,
    default: 1
  },
  editors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Indexing for better query performance
documentSchema.index({ title: 1 });
documentSchema.index({ 'author': 1 });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
