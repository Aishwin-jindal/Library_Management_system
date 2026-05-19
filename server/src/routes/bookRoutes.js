const express = require('express');
const { getBooks, getBookById, createBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(protect, upload.single('coverImage'), createBook);

router.route('/:id')
  .get(getBookById);

module.exports = router;
