// server.js

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// 1. Initialize App & Environment
// =============================================================
const app = express();
dotenv.config();

// 2. Middleware
// =============================================================
// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://njtwebgm.vercel.app', // Your live frontend URL
  // Add any other domains you want to allow, like a custom domain
];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or from an allowed origin
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
// --- End CORS Configuration ---

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// 3. API Routes
// =============================================================
// Your API routes should be defined before the production static file handling.
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// 4. Production Deployment Configuration
// =============================================================
// This section must be placed AFTER all of your API routes.
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  // Set the static assets folder for the built React app
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  // For any request that doesn't match an API route,
  // serve the main index.html file from the React build.
  // This is crucial for client-side routing to work.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  // A simple root route for development mode
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

// 5. Connect to DB & Start Server
// =============================================================
const PORT = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
  }
};

connectDB();
