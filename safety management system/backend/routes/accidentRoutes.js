const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accident');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware'); 

console.log('accidentController:', accidentController);

console.log('createAccident:', accidentController.createAccident);

// POST route for creating a new accident (with image upload)
router.post('/accidents', protect ,  upload, accidentController.createAccident);

// GET route for retrieving a specific accident by ID
router.get('/accidents/', accidentController.getAccident);

module.exports = router;