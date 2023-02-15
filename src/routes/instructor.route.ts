import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllInstructor } from '../controllers/instructor.controller';

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: instructor
  *     description: For instructor
  * /api/instructor/:
  *  get:
  *     tags:
  *     - instructor
  *     summary: get all instructors
  *     description: secretary get get all instructors
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
  *               instructors:
  *                 $ref: '#/components/schemas/Instructors'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  */

router.get('/', authorizationMiddleware, getAllInstructor);

export const instructorRouter: Router = router;