const mongoose = require('mongoose');

// Define a schema for Accident
const accidentSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  imageUrl: [{
    type: String,
    required: true 
  }],
  // usersAffected: [{
  //   type: String,
  //   ref: 'User',
  //   required: true
  // }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description:{
    type: String,
    required: true,
    trim: true,
    maxLength : 150 ,
    default: 'No description provided'
  }
});

const Accident = mongoose.model('Accident', accidentSchema);

module.exports = Accident;
