import express, {Router} from 'express';
import { getListTopic } from '../controllers/topic.controller';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';

const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: topic
  *     description: For topic
  * /api/topic/:
  *  get:
  *     tags:
  *     - topic
  *     summary: get list topic
  *     description: secretary and vice dean get list topic general info
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
  *         description: period of topic
  *       - in: query
  *         name: type
  *         schema:
  *           type: string
  *           enum: ["Chính quy", "Chất lượng cao", "Chất lượng cao (LVTN)", "Kĩ sư tài năng"]
  *         required: false
  *         description: type of that topic
  *       - in: query
  *         name: status
  *         schema:
  *           type: string
  *           enum: ["Tạo mới", "Đang thực hiện", "Đến hạn nghiệm thu", "Đã hoàn thành", "Trễ hạn", "Bị hủy"]
  *         required: false
  *         description: status of topic
  *       - in: query
  *         name: student
  *         schema:
  *           type: string
  *         required: false
  *         description: id of student account in mongoDB
  *       - in: query
  *         name: isExtended
  *         schema:
  *           type: boolean
  *         required: false
  *         description: is topic extend time
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topics:
  *                 $ref: '#/components/schemas/TopicsGeneralListResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */
router.get('/', authorizationMiddleware, getListTopic);

export const topicRouter: Router = router;