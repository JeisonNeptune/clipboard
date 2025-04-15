const User = require('../models/User');

// Create a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, passwordHash } = req.body;
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users (for dev/testing)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, getUsers };
