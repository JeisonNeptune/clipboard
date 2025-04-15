const Pin = require('../models/Pin');

const createPin = async (req, res) => {
  try {
    const pin = await Pin.create(req.body);
    res.status(201).json(pin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPins = async (req, res) => {
  try {
    const pins = await Pin.find().populate('addedBy').populate('boardId');
    res.json(pins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPinById = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id).populate('addedBy').populate('boardId');
    if (!pin) return res.status(404).json({ error: 'Pin not found' });
    res.json(pin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPin, getPins, getPinById };
