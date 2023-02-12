import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getUsedExpenseByPeriodWithTimeRange } from '../controllers/expenseStatistic.controller';

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: statistic
  *     description: For topic and expense statistic
  * /api/statistic/expense/{startYear}/{endYear}:
  *  get:
  *     tags:
  *     - statistic
  *     summary: get all periods win used expense in a time range
  *     description: get all periods win used expense in a time range
  *     parameters:
  *       - in: path
  *         name: startYear
  *         schema:
  *           type: string
  *         required: true
  *         description: start of time range
  *       - in: path
  *         name: endYear
  *         schema:
  *           type: string
  *         required: true
  *         description: end of time range
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/PeriodExpenseListResponse'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.get('/expense/:startYear/:endYear', authorizationMiddleware, getUsedExpenseByPeriodWithTimeRange);

export const statisticRouter: Router = router;