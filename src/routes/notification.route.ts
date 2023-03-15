import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getUnreadNotification } from '../controllers/notification.controller';

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: notification
  *     description: For notification
  * /api/notification/:
  *  get:
  *     tags:
  *     - notification
  *     summary: get all unread notification
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

router.get('/', authorizationMiddleware, getUnreadNotification);

export const notificationRouter: Router = router;