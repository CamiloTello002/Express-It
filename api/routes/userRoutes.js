const express = require('express');
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protect following routes. Only logged users can access them
router.use(authController.protect);

router.route('/profile').get(userController.getUserProfile).delete(userController.deleteUserProfile);

module.exports = router;