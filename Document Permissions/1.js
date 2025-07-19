// models/Document.js
const mongoose = require('mongoose');
const { PERMISSIONS } = require('../constants/permissions');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
  permissions: {
    type: Map,
    of: String, // Values will be 'read', 'write', etc.
    default: new Map(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Other fields like createdAt, updatedAt, etc.
});

module.exports = mongoose.model('Document', documentSchema);