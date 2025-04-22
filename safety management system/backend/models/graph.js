const mongoose = require('mongoose');

// Define a schema for Graph
const graphSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  accidents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accident',
    required: true
  }]
});

// Create a model
const Graph = mongoose.model('Graph', graphSchema);

module.exports = Graph;
