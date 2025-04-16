const express = require('express');
const router = express.Router();
const { createPin, getPins, getPinById, deletePin } = require('../controllers/pinController');

router.post('/', createPin);
router.get('/', getPins);
router.get('/:id', getPinById);
router.delete("/:id", deletePin);


module.exports = router;
