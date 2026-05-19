const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./src/models/Book');

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const books = await Book.find({});
  console.log('Total Books:', books.length);
  const categories = {};
  books.forEach(b => {
    categories[b.category] = (categories[b.category] || 0) + 1;
  });
  console.log('Categories in DB:', categories);
  process.exit(0);
};

run();
