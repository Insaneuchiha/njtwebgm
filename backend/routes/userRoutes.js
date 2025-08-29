import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js';

// Route for registering a new admin user
router.post('/register', registerUser);

// Route for logging in an admin user
router.post('/login', loginUser);

export default router;
