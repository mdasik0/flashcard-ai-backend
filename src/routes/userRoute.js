const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getUsers);

module.exports = router;