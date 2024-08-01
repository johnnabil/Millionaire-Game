import express from 'express';
import Score from '../models/scoreModel.js';

const router = express.Router();

// Create a new score
router.post('/', async (req, res) => {
  try {
    const { name, score } = req.body;
    const newScore = new Score({ name, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete all scores
router.delete('/', async (req, res) => {
  try {
    await Score.deleteMany();
    res.status(204).json({message: "All scores deleted"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
