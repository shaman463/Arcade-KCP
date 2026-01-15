import express from 'express';
import verifyToken from '../middleware/auth.js';
import GameScore from '../models/GameScore.js';

const router = express.Router();

// @route   POST /api/scores
// @desc    Save a game score
// @access  Private
router.post('/', verifyToken, async (req, res) => {
  try {
    const { gameName, score, gameData } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!gameName || score === undefined) {
      return res.status(400).json({ error: 'gameName and score are required' });
    }

    const newScore = new GameScore({
      userId,
      gameName,
      score,
      gameData: gameData || {},
    });

    await newScore.save();

    res.status(201).json({
      message: 'Score saved successfully',
      score: newScore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/scores/:userId
// @desc    Get all scores for a user
// @access  Private
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const scores = await GameScore.find({ userId }).sort({ createdAt: -1 });

    res.json({
      scores,
      total: scores.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/scores/game/:gameName
// @desc    Get top 10 scores for a specific game
// @access  Public
router.get('/game/:gameName', async (req, res) => {
  try {
    const { gameName } = req.params;

    const topScores = await GameScore.find({ gameName })
      .populate('userId', 'username')
      .sort({ score: -1 })
      .limit(10);

    res.json({
      gameName,
      topScores,
      total: topScores.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/scores
// @desc    Get all leaderboards
// @access  Public
router.get('/', async (req, res) => {
  try {
    const games = ['snake', 'tictactoe', 'memorygame', 'rockpaper'];

    const leaderboards = {};

    for (const game of games) {
      const topScores = await GameScore.find({ gameName: game })
        .populate('userId', 'username')
        .sort({ score: -1 })
        .limit(5);

      leaderboards[game] = topScores;
    }

    res.json(leaderboards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
