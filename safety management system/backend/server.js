require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const accidentRoutes = require('./routes/accidentRoutes');
const userRoutes = require('./routes/userRoutes');         
const authRoutes = require('./routes/authRoutes');  
const jwt = require("jsonwebtoken");

// dotenv.config();
// require('dotenv').config(); // Ensure dotenv is loaded

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connection successful')) 
  .catch((err) => console.error('MongoDB connection error:', err));
//routes
app.use('/api/auth', authRoutes); 
app.use('/api' , userRoutes);       
app.use('/api', accidentRoutes);     

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Start the server
const port = process.env.PORT ; // Default port to 5000 if not defined in .env
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
