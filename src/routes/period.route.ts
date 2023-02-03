import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllPeriod } from '../controllers/period.controller';

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
  */

router.get('/', authorizationMiddleware, getAllPeriod);

export const periodRouter: Router = router;