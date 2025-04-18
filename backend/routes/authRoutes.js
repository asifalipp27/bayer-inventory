const express = require('express');
const { register, login, logout, test } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/test', test);

module.exports = router;
