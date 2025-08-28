// server.js

import path from 'path'; // Node.js module for working with file paths
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Initialize App & Middleware
const app = express();
dotenv.config();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// In development, we allow all origins.
// In production, you should restrict this to your actual domain.
app.use(cors()); 

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// --- PRODUCTION DEPLOYMENT CONFIGURATION ---
// This section will only run in the production environment
if (process.env.NODE_ENV === 'production') {
  // Get the current directory name
  const __dirname = path.resolve();

  // Serve the static files from the React app's build folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // For any route that is not an API route, send the index.html file
  // This is necessary for client-side routing (React Router) to work correctly.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  // If not in production, just have a simple welcome message for the root
  app.get('/', (req, res) => {
    res.send('Welcome to the Business API!');
  });
}

// Setup Server Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Start Server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
  }
};

connectDB();
// --- END OF PRODUCTION DEPLOYMENT CONFIGURATION ---
