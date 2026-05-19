const express = require('express');
const { registerUser, authUser, googleLogin } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/signup', upload.single('profilePic'), registerUser);
router.post('/login', authUser);
router.post('/google', googleLogin);

module.exports = router;
