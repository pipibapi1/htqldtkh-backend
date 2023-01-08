import express, {Router} from 'express';
const router: Router = express.Router();

import { authRouter } from './auth.route';
import { facultyViceDeanRouter } from './facultyViceDean.route';
import { testRouter } from './test.route';

router.use("/auth", authRouter);
router.use("/vicedean", facultyViceDeanRouter);
router.use("/test", testRouter)

export const fullRouter: Router = router;