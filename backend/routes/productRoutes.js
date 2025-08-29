import express from 'express';
const router = express.Router();

// A simple test route to see if the server starts.
router.get('/test', (req, res) => {
  res.send('Product routes are working.');
});

export default router;

