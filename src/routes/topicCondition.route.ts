import express, {Router} from 'express';
import { getTopicCondition, postTopicCondition, deleteTopicCondition,
    putUpdateTopicCondition } from '../controllers/topicCondition.controller';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: topic's register condition
  *     description: For topic's register condition
  * /api/topicCondition/:
  *  get:
  *     tags:
  *     - topic's register condition
  *     summary: get topic's register condition
  *     description: user get latest topic's register condition
  *     parameters:
  *       - in: query
  *         name: type
  *         schema:
  *           type: string
  *           enum: ["Chính quy", "Chất lượng cao", "Chất lượng cao (LVTN)", "Kĩ sư tài năng"]
  *         required: false
  *         description: kind of topic
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
  *               topicCondition:
  *                 $ref: '#/components/schemas/TopicCondition'
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
  *     - topic's register condition
  *     summary: create topic's register condition
  *     description: secretary and vicedean create new topic's register condition
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *         schema:
  *           type: object
  *           properties:
  *             topicCondition:
  *               $ref: '#/components/schemas/TopicCondition'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topicCondition:
  *                 $ref: '#/components/schemas/TopicCondition'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/topicCondition/{_id}:
  *  put:
  *     tags:
  *     - topic's register condition
  *     summary: update topic's register condition
  *     description: secretary update topic's register condition
  *     parameters:
  *       - in: params
  *         name: _id
  *         schema:
  *           type: string
  *         required: true
  *         description: topic condition _id
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *         schema:
  *           type: object
  *           properties:
  *             topicCondition:
  *               $ref: '#/components/schemas/TopicCondition'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topicCondition:
  *                 $ref: '#/components/schemas/TopicCondition'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  delete:
  *     tags:
  *     - topic's register condition
  *     summary: delete topic's register condition
  *     description: secretary and vicedean delete topic's register condition
  *     parameters:
  *       - in: params
  *         name: _id
  *         schema:
  *           type: string
  *         required: true
  *         description: topic condition _id
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.get("/", getTopicCondition);
router.post("/", authorizationMiddleware, postTopicCondition);
router.put("/:topicConditionId", authorizationMiddleware, putUpdateTopicCondition);
router.delete("/:topicConditionId", authorizationMiddleware, deleteTopicCondition);

export const topicConditionRouter: Router = router;