import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllPeriod, postAddAPeriod, putUpdateAPeriod } from '../controllers/period.controller';

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
  * /api/period/{_id}:
  *  put:
  *     tags:
  *     - period
  *     summary: update period detail
  *     description: update period detail
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of period in mongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/PeriodInput'
  *     responses:
  *      200:
  *        description: Success
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/Period'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.get('/', getAllPeriod);
router.post('/', authorizationMiddleware, postAddAPeriod);
router.put('/:_id', authorizationMiddleware, putUpdateAPeriod);

export const periodRouter: Router = router;