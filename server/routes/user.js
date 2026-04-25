import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user progress
router.get('/:username', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      user = await User.create({ username: req.params.username });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user progress
router.put('/:username', async (req, res) => {
  try {
    const { xp, hearts, badges, completedStages, completedQuests } = req.body;
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { xp, hearts, badges, completedStages, completedQuests },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
