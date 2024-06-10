const express = require('express');
const authController = require('./../controllers/authController')

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/loggedin', authController.protect);

// TODO: Add a middleware that protects routes in case the user is logged in

module.exports = router;