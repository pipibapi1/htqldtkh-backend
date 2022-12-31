import express, {Router} from 'express';
import { awaitHandler } from '../middlewares/await-handler.middleware';
import { testController } from '../controllers/test.controller';

const router: Router = express.Router();

/**
  * @openapi
  * /api/test:
  *  get:
  *     tags:
  *     - test
  *     summary: Test api
  *     description: Return a test response
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *              $ref: '#/components/schemas/CreateUserInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/CreateUserResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */
router.get('/', awaitHandler(testController.getTest));

export const testRouter: Router = router;