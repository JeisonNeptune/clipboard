const Board = require('../models/Board');

const createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate('createdBy');
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('pins').populate('createdBy');
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBoard, getBoards, getBoardById };
