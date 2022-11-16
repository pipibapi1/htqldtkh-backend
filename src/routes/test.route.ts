import express, {Router} from 'express';
import { awaitHandler } from '../middlewares/await-handler.middleware';
import { testController } from '../controllers/test.controller';

const router: Router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *    description: This is a test api
 *    responses:
 *      '200':
 *        description: Successfull response 'Express + TypeScript Server'
 */
router.get('/', awaitHandler(testController.getTest));

export const testRouter: Router = router;