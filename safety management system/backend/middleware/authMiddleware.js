// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const protect = async (req, res, next) => {
//   let token;

  
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
    
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

     
//       req.user = await User.findById(decoded.userId).select('-password');

//       if (!req.user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       next(); 
//     } catch (error) {
//       console.error('Token verification error:', error); 
//       res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
//     }
//   } else {
   
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = protect;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;
  console.log('Authorization Header:', req.headers.authorization);//debug


  // Check for Authorization header and token format
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted Token:', token);//debug

      // Check if token is missing
      if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
      }

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);//debug
      const creationTime = new Date(decoded.iat * 1000); // Convert from seconds to milliseconds
      const expirationTime = new Date(decoded.exp * 1000); // Convert from seconds to milliseconds

      console.log('Token created at:', creationTime);
      console.log('Token expires at:', expirationTime);

      // Fetch user from the database, exclude password
      req.user = await User.findById(decoded.userId).select('-password');
      console.log('Fetched User:', req.user);//debug

      // If no user is found with the token's userId
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Pass control to the next middleware
      next();
    } catch (error) {
      console.error('Token verification error:', error);

      // Handle specific JWT errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Catch-all error message for other issues
      return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
    }
  } else {
    // If Authorization header or token is missing
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = {protect};
