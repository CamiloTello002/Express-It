const express = require('express');
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

const router = express.Router();

/**
 * @openapi
 * /api/v1/register:
 *   post:
 *     summary: This endpoint allows a new user to register by providing a username and a password.
 *     tags:
 *       - User
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: Berkley
 *                          password:
 *                              type: string
 *                              format: password
 *                              example: Astonishing
 *                      required:
 *                          - username
 *                          - password
 *     responses:
 *          required: true
 */
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protect following routes. Only logged users can access them
router.use(authController.protect);

router.route('/profile').get(userController.getUserProfile).delete(userController.deleteUserProfile);

module.exports = router;