const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
  type: { type: String, enum: ['song', 'clip', 'image'], required: true },
  contentUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  title: { type: String },
  note: { type: String },
  tags: [{ type: String }],
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pin', PinSchema);
