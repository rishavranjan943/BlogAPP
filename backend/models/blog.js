const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String },
  genre: {
    type: String,
    enum: ['Politics','Sports','Technology','Health'],
    default: 'Politics'
  },
  image: { type: String, required: true },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
