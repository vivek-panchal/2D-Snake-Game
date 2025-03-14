const Score = require('../models/Score');
const User = require('../models/User');

// add the score
exports.addScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user.id;

    if (!score && score !== 0) {
      return res.status(400).json({ message: 'Please provide a score' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newScore = await Score.create({
      user: userId,
      username: user.username,
      score,
    });

    res.status(201).json(newScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get all scores
exports.getScores = async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .populate('user', 'username');

    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get top 10 scores
exports.getTopScores = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(limit)
      .populate('user', 'username');

    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get a user scores
exports.getUserScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user.id })
      .sort({ score: -1 })
      .populate('user', 'username');

    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};