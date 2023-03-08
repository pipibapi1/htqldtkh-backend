import express, {Router} from 'express';
import { getCouncilDetail, getListCouncil, postNewCouncil, postAddTopicToCouncil, 
    deleteCouncil, putUpdateCouncil, getCouncilStatistics } from '../controllers/council.controller';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';

const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: council
  *     description: For manage council
  * /api/council:
  *  post:
  *     tags:
  *     - council
  *     summary: create new council
  *     description: secretary create new council
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               council:
  *                  $ref: '#/components/schemas/CouncilInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               council:
  *                  $ref: '#/components/schemas/CouncilGeneralInfo'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  get:
  *     tags:
  *     - council
  *     summary: get list council
  *     description: secretary get list council in 1 period
  *     parameters:
  *       - in: query
  *         name: type
  *         schema:
  *           type: string
  *           enum: ["Xét duyệt", "Nghiệm thu"]
  *         required: true
  *         description: Type of council
  *       - in: query
  *         name: period
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of period
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
  *               councils:
  *                  type: array
  *                  items:
  *                    $ref: '#/components/schemas/CouncilGeneralInfo'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/council/{_id}:
  *  get:
  *     tags:
  *     - council
  *     summary: get council detail
  *     description: secretary get detail of council
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of council
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
  *               council:
  *                  $ref: '#/components/schemas/CouncilDetailInfo'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not found
  *  put:
  *     tags:
  *     - council
  *     summary: update council
  *     description: secretary update council info
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of council
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               council:
  *                  $ref: '#/components/schemas/CouncilUpdateData'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               council:
  *                  $ref: '#/components/schemas/CouncilGeneralInfo'
  *      400:
  *        description: Bad request
  *      404:
  *        description: Email Not found
  *  delete:
  *     tags:
  *     - council
  *     summary: delete council
  *     description: Secretary delete council
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
  * /api/council/{_id}/topic:
  *  post:
  *     tags:
  *     - council
  *     summary: add new topic to council
  *     description: secretary add new topic to council
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of council
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               topics:
  *                  type: array
  *                  items: 
  *                    type: string
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               council:
  *                  $ref: '#/components/schemas/CouncilDetailInfo'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      404:
  *        description: Not found
  * /api/council/{_id}/topic/{topicId}:
  *  delete:
  *     tags:
  *     - council
  *     summary: delete topic in council
  *     description: secretary delete topic in council
  *     parameters:
  *       - in: path
  *         name: _id
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of council
  *       - in: path
  *         name: topicId
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of topic
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
  *               council:
  *                  $ref: '#/components/schemas/CouncilGeneralInfo'
  *      400:
  *        description: Bad request
  *      404:
  *        description: Email Not found
  * /api/council/statistics:
  *  get:
  *     tags:
  *     - council
  *     summary: get council statistics
  *     description: secretary get council statistics in 1 period
  *     parameters:
  *       - in: query
  *         name: type
  *         schema:
  *           type: string
  *           enum: ["Xét duyệt", "Nghiệm thu"]
  *         required: true
  *         description: Type of council
  *       - in: query
  *         name: period
  *         schema:
  *           type: string
  *           example: 0123456789abcdef
  *         required: true
  *         description: _id of period
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
  *               councilStatistics:
  *                 type: object
  *                 properties:
  *                   topicNeedCouncil:
  *                     type: number
  *                     example: 15
  *                   topicHadCouncil:
  *                     type: number
  *                     example: 15
  *                   numCouncil:
  *                     type: number
  *                     example: 5
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.get("/statistics", authorizationMiddleware, getCouncilStatistics);
router.get("/", authorizationMiddleware, getListCouncil);
router.post("/", authorizationMiddleware, postNewCouncil);
router.get("/:councilId", authorizationMiddleware, getCouncilDetail);
router.put("/:councilId", authorizationMiddleware, putUpdateCouncil);
router.delete("/:councilId", authorizationMiddleware, deleteCouncil);
router.post("/:councilId/topic", authorizationMiddleware, postAddTopicToCouncil);

export const councilRouter: Router = router;