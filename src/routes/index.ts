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
import { periodRouter } from './period.route';
import { staffRouter } from './staff.route';
import { topicConditionRouter } from './topicCondition.route';
import { statisticRouter } from './statistic.route';
import { paperTemplateRouter } from './paperTemplate.route';
import { instructorRouter } from './instructor.route';
import { relevantPaperRouter } from './relevantPaper.route';
import { productRouter } from './product.route';
import { councilRouter } from './council.route';
import { formRouter } from './form.route';
import { sendEmailRouter } from './sendEmail.route';

router.use("/auth", authRouter);
router.use("/vicedean", facultyViceDeanRouter);
router.use("/secretary", facultySecretaryRouter);
router.use('/announcement', announcementRouter);
router.use('/student', studentRouter);
router.use('/expense', allocatedExpenseRouter);
router.use("/request", requestRouter);
router.use("/topic", topicRouter);
router.use("/period", periodRouter);
router.use("/staff", staffRouter);
router.use("/topicCondition", topicConditionRouter);
router.use("/statistic", statisticRouter);
router.use("/template", paperTemplateRouter);
router.use("/paper", relevantPaperRouter);
router.use("/instructor", instructorRouter);
router.use("/product", productRouter);
router.use("/council", councilRouter);
router.use("/form", formRouter);
router.use("/sendEmail", sendEmailRouter)

export const fullRouter: Router = router;