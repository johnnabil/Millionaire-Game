import express from 'express';
import { Question } from '../models/questionModel.js';

const router = express.Router();

//Create a question
router.post('/', async (req, res) => {
  try {
    if (!req.body.question || !req.body.options || !req.body.correct_option) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newQuestion = {
      question: req.body.question,
      options: req.body.options,
      correct_option: req.body.correct_option,
    };
    const question = await Question.create(newQuestion);
    res.status(201).send(question);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Read all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Read a question by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Update a question
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.question || !req.body.options || !req.body.correct_option) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const question = await Question.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

export default router;