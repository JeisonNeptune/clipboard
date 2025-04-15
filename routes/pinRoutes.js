const express = require('express');
const router = express.Router();
const { createPin, getPins, getPinById } = require('../controllers/pinController');

router.post('/', createPin);
router.get('/', getPins);
router.get('/:id', getPinById);

module.exports = router;
