const express = require('express');
const { 
  addScore, 
  getScores, 
  getTopScores, 
  getUserScores 
} = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all scores
router.get('/', getScores);

// Get top scores
router.get('/top', getTopScores);

// Get user's scores
router.get('/user', protect, getUserScores);

// Add a new score
router.post('/', protect, addScore);

module.exports = router;