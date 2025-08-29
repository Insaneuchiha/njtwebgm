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
  'http://localhost:5173',
  'https://njtwebgm.vercel.app',
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
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// 4. Production Deployment Configuration
// =============================================================
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  const frontendDistPath = path.join(__dirname, 'frontend', 'dist');

  app.use(express.static(frontendDistPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(frontendDistPath, 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// 5. Connect to DB & Start Server
// =============================================================
const PORT = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`Successfully connected to database: ${mongoose.connection.name}`);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
    process.exit(1);
  }
};

connectDB();

