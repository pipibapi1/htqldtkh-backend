import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllPeriod, postAddAPeriod } from '../controllers/period.controller';

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: period
  *     description: For period
  * /api/period/:
  *  get:
  *     tags:
  *     - period
  *     summary: get all periods
  *     description: secretary and vice dean get get all periods
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               periods:
  *                 $ref: '#/components/schemas/Periods'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *  post:
  *     tags:
  *     -  period
  *     summary: add new period
  *     description: secretary add new period
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               period:
  *                 $ref: '#/components/schemas/PeriodInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/Period'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  */

router.get('/', authorizationMiddleware, getAllPeriod);
router.post('/', authorizationMiddleware, postAddAPeriod);

export const periodRouter: Router = router;