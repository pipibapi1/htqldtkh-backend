import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getListRequest } from '../controllers/request.controller';

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: request
  *     description: For request
  * /api/request/:
  *  get:
  *     tags:
  *     - request
  *     summary: get a list request
  *     description: secretary and vice dean get a list request
  *     parameters:
  *       - in: query
  *         name: page
  *         schema:
  *           type: string
  *         required: false
  *         description: page num
  *       - in: query
  *         name: limit
  *         schema:
  *           type: string
  *         required: false
  *         description: num item per page
  *       - in: query
  *         name: period
  *         schema:
  *           type: string
  *         required: false
  *         description: period id, use for filter
  *       - in: query
  *         name: type
  *         schema:
  *           type: string
  *           enum: ["Xin giấy chứng nhận", "Gia hạn đề tài", "Hủy đề tài"]
  *         required: false
  *         description: type of request, use for filter
  *       - in: query
  *         name: status
  *         schema:
  *           type: string
  *           enum: ["Chờ xét duyệt", "Đã xét duyệt", "Bị từ chối"]
  *         required: false
  *         description: status of request, use for filter
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
  *               requests:
  *                 $ref: '#/components/schemas/RequestGeneralInfoList'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.get('/', authorizationMiddleware, getListRequest);

export const requestRouter: Router = router;