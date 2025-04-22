const User = require('../models/user');
const OTP = require('../models/otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register user and send OTP
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() }); // Email case insensitive
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with unverified status
    const newUser = new User({
      username,
      email: email.toLowerCase(), // Save email in lowercase
      password: hashedPassword,
      isVerified: false,
    });

    // Save the new user in the database
    await newUser.save();

    // Generate OTP
    const otp = generateOTP();
    const otpEntry = new OTP({ userId: newUser._id, otp });

    // Attempt to save OTP and send email
    try {
      await otpEntry.save(); // Save OTP in the database
      await sendEmail(email, 'OTP for Email Verification', `Your OTP is ${otp}`); // Send OTP via email

      return res.status(201).json({ message: 'User registered successfully, OTP sent to email' });
    } catch (error) {
      console.error('Error saving OTP or sending email:', error);
      return res.status(500).json({ message: 'User registered, but there was an error sending OTP email' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }); // Email case insensitive
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find OTP entry for the user
    const otpEntry = await OTP.findOne({ userId: user._id, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Clean up OTP entry after verification
    await OTP.deleteOne({ userId: user._id });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }); // Email case insensitive
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    return res.status(200).json({ 
      message: 'Successfully logged in', 
      user:{
       id: user._id,
       username: user.username,
       email: user.email,
    },
    token,
  });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { registerUser, verifyOTP, loginUser };
