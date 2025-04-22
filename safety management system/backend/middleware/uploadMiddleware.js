const multer = require('multer');

// Use memory storage to store uploaded images in memory
const storage = multer.memoryStorage();

// Configure multer with file size limit and file filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
  fileFilter: (req, file, cb) => {
    // Check if the uploaded file is an image
    if (!file.mimetype.startsWith('image/')) {
      // Reject files that are not images
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true); // Accept the file
  },
}).array('images',10);

// Export the upload middleware configured for handling an array of files
module.exports = upload; // Allow multiple images (up to 10) for this field
