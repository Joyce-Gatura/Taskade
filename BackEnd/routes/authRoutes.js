

const express = require('express');
const router = express.Router();
const { register, login, checkAuth, logout } = require('../controllers/authController');

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/checkAuth', checkAuth);
router.post('/logout', logout); // Add logout route

module.exports = router;

