import express, {Router} from 'express';
const router: Router = express.Router();

import { authRouter } from './auth.route';
import { facultyViceDeanRouter } from './facultyViceDean.route';
import { announcementRouter } from './announcement.route';
import { studentRouter } from './student.route';

router.use("/auth", authRouter);
router.use("/vicedean", facultyViceDeanRouter);
router.use('/announcement', announcementRouter);
router.use('/student', studentRouter);

export const fullRouter: Router = router;