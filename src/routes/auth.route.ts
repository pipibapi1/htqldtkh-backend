import express, {Router} from 'express';
import signUp from '../controllers/signup';
import signIn from '../controllers/signin';

const router: Router = express.Router();

/**
  * @openapi
  * /api/auth/signup:
  *  post:
  *     tags:
  *     - signup
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
  *              $ref: '#/components/schemas/SignUpResponse'
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
  *     - signin
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
  */
router.post('/signup', signUp)
router.post('/signin', signIn)

export const authRouter: Router = router;