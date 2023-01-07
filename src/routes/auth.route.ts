import express, {Router} from 'express';
import signUp from '../controllers/signup';
import signIn from '../controllers/signin';
import { authorization } from '../middlewares/authorize.middleware';
import testAuth from '../controllers/testAuth.controller';

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
  * /api/auth/test:
  *  post:
  *     tags:
  *     - authorization
  *     summary: Test authorization
  *     description: Test authorization
  *     security:
  *      - bearerAuth: [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2luaCB2acOqbiIsIl9pZCI6IjYzYjYzYzM3OWRkMDE0NjdjNGYwOTUwYSIsInN0dWRlbnRJZCI6IjE5MTI5MTYiLCJlbWFpbCI6Im1kdXlAZ21haWwuY29tIiwiaWF0IjoxNjcyODg3OTg0LCJleHAiOjE2NzI4OTUxODR9.es9-MNaKVVybCjM8qHYPvNmj2GotpaOiBcyDruKk3Hs]
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/test', authorization, testAuth);

export const authRouter: Router = router;