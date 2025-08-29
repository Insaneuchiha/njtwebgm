// server.js

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// DEBUGGING STEP: Temporarily comment out one of the route imports
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
  // Add your custom domain here once you set it up
];
const corsOptions = {
  origin: function (origin, callback) {
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
// DEBUGGING STEP: Comment out one of the app.use() lines to isolate the issue.
// Let's start by disabling the product routes.
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// 4. Production Deployment Configuration
// =============================================================
// This section is temporarily disabled for debugging the startup error.
// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
//   app.use(express.static(frontendDistPath));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(frontendDistPath, 'index.html'))
//   );
// } else {
  // A simple root route for development mode
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
// }


// 5. Connect to DB & Start Server
// =============================================================
const PORT = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

