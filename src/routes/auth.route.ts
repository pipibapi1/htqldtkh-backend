import express, {Router} from 'express';
import signUpController from '../controllers/signup.controller';
import signInController from '../controllers/signin.controller';
import resetpwController from '../controllers/resetpw.controller';
import testAuth from '../controllers/testAuth.controller';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';

const router: Router = express.Router();

/**
  * @openapi
  * /api/auth/signup:
  *  post:
  *     tags:
  *     - Sign Up
  *     summary: Sign up
  *     description: student sign up
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *              $ref: '#/components/schemas/SignUpInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/AuthResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/auth/signin:
  *  post:
  *     tags:
  *     - Sign In
  *     summary: Sign in
  *     description: user sign in
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *              $ref: '#/components/schemas/SignInInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/AuthResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/auth/resetpw:
  *  put:
  *     tags:
  *     - Reset Password
  *     summary: Reset Password
  *     description: user reset password
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *              $ref: '#/components/schemas/ResetPwInput'
  *     responses:
  *      200:
  *        description: Password reset successfully!
  *      400:
  *        description: Bad request
  *      404:
  *        description: Email Not found
  * /api/auth/test:
  *  post:
  *     tags:
  *     - authorization
  *     summary: Test authorization
  *     description: Test authorization
  *     security:
  *      - bearerAuth: []
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */
router.post('/signup', signUpController);
router.post('/signin', signInController);
router.put('/resetpw', resetpwController);
router.post('/test', authorizationMiddleware, testAuth)

export const authRouter: Router = router;