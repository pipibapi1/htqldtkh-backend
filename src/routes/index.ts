import express, {Router} from 'express';
const router: Router = express.Router();

import { authRouter } from './auth.route';
import { facultyViceDeanRouter } from './facultyViceDean.route';
import { announcementRouter } from './announcement.route';
import { studentRouter } from './student.route';
import { allocatedExpenseRouter } from './allocatedExpense.route';
import { facultySecretaryRouter } from './facultySecretary.route';
import { requestRouter } from './request.route';
import { topicRouter } from './topic.route';

router.use("/auth", authRouter);
router.use("/vicedean", facultyViceDeanRouter);
router.use("/secretary", facultySecretaryRouter);
router.use('/announcement', announcementRouter);
router.use('/student', studentRouter);
router.use('/expense', allocatedExpenseRouter);
router.use("/request", requestRouter);
router.use("/topic", topicRouter);

export const fullRouter: Router = router;