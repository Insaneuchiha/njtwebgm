// server.js

// 1. Import Dependencies
// =============================================================
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
// Import the new user routes
import userRoutes from './routes/userRoutes.js';

// 2. Initialize Express App & Middleware
// =============================================================
const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// 3. API Routes
// =============================================================
app.use('/api/products', productRoutes);
// Tell Express to use the userRoutes for any request that starts with '/api/users'.
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Business API!');
});


// 4. Setup Server Port
// =============================================================
const PORT = process.env.PORT || 5000;

// 5. Connect to MongoDB and Start Server
// =============================================================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
  }
};

connectDB();
