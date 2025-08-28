// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  // The token is usually sent in the authorization header, formatted as "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Get token from header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from the token's payload (the user ID)
      // We attach the user object to the request so our controllers can access it
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Call the next piece of middleware or the controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
