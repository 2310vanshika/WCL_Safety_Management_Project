const Accident = require('../models/accident');
const User = require('../models/user');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/uploadMiddleware');

exports.createAccident = async (req, res) => {
  try {
    console.log('Create Accident Request Body:', req.body);
    console.log('Uploaded Files:', req.files);

    const { usersAffected } = req.body;

    // Check if images are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload images to Cloudinary and store their URLs
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error); // Log the error for debugging
              return reject(error); // Reject the promise if there's an error
            }
            resolve(result); // Resolve the promise with the result
          }
        );
        uploadStream.end(file.buffer); // Upload the image buffer directly
      });
    });

    const uploadResponses = await Promise.all(uploadPromises);
    const imageUrls = uploadResponses.map(response => response.secure_url);

    console.log('Uploaded Image URLs:', imageUrls);

    // Create a new accident instance
    const accident = new Accident({
      imageUrl: imageUrls, // Store the array of uploaded image URLs
      // usersAffected,
      description : req.body.description , 
      postedBy: req.user._id // Assuming `req.user` contains the logged-in user
    });

    // Save the accident to the database
    const savedAccident = await accident.save();
    res.status(201).json({ message: 'Accident created successfully', accident: savedAccident });
  } catch (error) {
    console.error('Error creating accident:', error);
    res.status(500).json({ message: 'Error creating accident', error: error.message });
  }
};

exports.getAccident = async (req, res) => {
  try {
    const accident = await Accident.find()
      .populate('postedBy', 'username email')
      // .populate('usersAffected', 'username email');

    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }

    res.status(200).json(accident);
  } catch (error) {
    console.error('Error retrieving accident:', error);
    res.status(500).json({ message: 'Error retrieving accident', error: error.message });
  }
};
