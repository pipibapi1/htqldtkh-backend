import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllStaff } from '../controllers/staff.controller';

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: staff
  *     description: For staff
  * /api/staff/:
  *  get:
  *     tags:
  *     - staff
  *     summary: get all staffs
  *     description: secretary get get all staffs
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
  *               staffs:
  *                 $ref: '#/components/schemas/Staffs'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  */

router.get('/', authorizationMiddleware, getAllStaff);

export const staffRouter: Router = router;