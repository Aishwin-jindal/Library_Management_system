const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Issued'],
    default: 'Available',
  },
  summary: {
    type: String,
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
