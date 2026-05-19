const express = require('express');
const User = require('../models/User');
const Book = require('../models/Book');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get aggregated stats for Reports
// @route   GET /api/reports/stats
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalBooks = await Book.countDocuments({});

    // Calculate total assets (sum of book prices)
    const assetStats = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$price' },
        },
      },
    ]);
    const totalValue = assetStats[0]?.totalValue || 0;

    // Get count of books grouped by category
    const categoryStats = await Book.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Format categories
    const categories = categoryStats.map((c) => ({
      name: c._id || 'Unknown',
      count: c.count,
    }));

    res.json({
      totalUsers,
      totalBooks,
      totalValue,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
