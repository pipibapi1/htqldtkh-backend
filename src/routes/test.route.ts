import express, {Router} from 'express';
import { awaitHandler } from '../middlewares/await-handler.middleware';
import { testController } from '../controllers/test.controller';

const router: Router = express.Router();

router.get('/', awaitHandler(testController.getTest));

export const testRouter: Router = router;