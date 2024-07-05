const express = require('express');
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

const router = express.Router();

/**
 * @openapi
 * /api/v1/users/register:
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
 *          '201':
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Registered successfully!
 *          '400':
 *              description: User already exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: This user already exists
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: This endpoint allows an existing user to log in. In order to use this endpoint, you must make sure you already have an account created. For performing this action, you can refer to the register endpoint
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
 *          '200':
 *              description: User logged in successfully.
 *              headers:
 *                  Set-Cookie:
 *                      schema:
 *                          type: string
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: successfully logged in!
 */
router.post('/login', authController.login);

/**
 * @openapi
 * /api/v1/users/logout:
 *   get:
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/logout', authController.logout);

// Protect following routes. Only logged users can access them
router.use(authController.protect);

router.route('/profile').get(userController.getUserProfile).delete(userController.deleteUserProfile);

module.exports = router;