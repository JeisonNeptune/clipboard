const express = require('express');
const router = express.Router();
const { registerUser, getUsers } = require('../controllers/userController');

// POST /api/users
router.post('/', registerUser);

// GET /api/users
router.get('/', getUsers);

module.exports = router;
