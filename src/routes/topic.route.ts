import express, { Router } from 'express';
import {
  getListTopic, getTopicDetail, postAddNewTopic,
  putUpdateTopic, deleteTopic
} from '../controllers/topic.controller';
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
  *       - in: query
  *         name: textSearch
  *         schema:
  *           type: string
  *         required: false
  *         description: the text to search on name or topicGivenId
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
  *  post:
  *     tags:
  *     - topic
  *     summary: post new topic
  *     description: student create new topic
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topic:
  *                 $ref: '#/components/schemas/TopicInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topic:
  *                 $ref: '#/components/schemas/TopicDetail'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/topic/{_id}:
  *  get:
  *     tags:
  *     - topic
  *     summary: get topic detail
  *     description: user get topic detail by _id
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *         required: true
  *         description: _id of topic in mongoDB
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
  *               topic:
  *                 $ref: '#/components/schemas/TopicDetail'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  put:
  *     tags:
  *     - topic
  *     summary: update a topic detail
  *     description: update topic detail by _id
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *         required: true
  *         description: _id of topic in mongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              viceDean:
  *                $ref: '#/components/schemas/TopicInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topic:
  *                 $ref: '#/components/schemas/TopicDetail'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  delete:
  *     tags:
  *     - topic
  *     summary: delete a topic
  *     description: delete a topic by id
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *         required: true
  *         description: _id of topic in mongoDB
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */
router.get('/', authorizationMiddleware, getListTopic);
router.post('/', authorizationMiddleware, postAddNewTopic);
router.get('/:topicId', authorizationMiddleware, getTopicDetail);
router.put('/:topicId', authorizationMiddleware, putUpdateTopic);
router.delete('/:topicId', authorizationMiddleware, deleteTopic);

export const topicRouter: Router = router;