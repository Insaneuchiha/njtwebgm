// backend/controllers/userController.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// Helper function to generate a JWT
const generateToken = (id) => {
  // jwt.sign takes a payload (the user's id), a secret, and options.
  // The token will expire in 30 days.
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new admin user
// @route   POST /api/users/register
// @access  Public (for now, so you can create your first admin account)
const registerUser = async (req, res) => {
  // FIX: Changed 'of' to '=' for destructuring
  const { name, email, password } = req.body;

  // 1. Validation: Check if all fields were sent
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  // 2. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // 3. Hash the password
  // A "salt" is random data added to the password before hashing to make it more secure.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Create the user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 5. If user was created, send back user data and a token
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Authenticate/Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  // FIX: Changed 'of' to '=' for destructuring
  const { email, password } = req.body;

  // 1. Find the user by email
  const user = await User.findOne({ email });

  // 2. Check if user exists and if the provided password matches the stored hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // 3. If they match, send back user data and a new token
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

export { registerUser, loginUser };
