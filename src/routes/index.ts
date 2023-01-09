import express, {Router} from 'express';
const router: Router = express.Router();

import { authRouter } from './auth.route';
import { facultyViceDeanRouter } from './facultyViceDean.route';

router.use("/auth", authRouter);
router.use("/vicedean", facultyViceDeanRouter);


export const fullRouter: Router = router;