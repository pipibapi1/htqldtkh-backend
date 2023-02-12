import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { deleteRemoveARequest, getListRequest, getRequestDetail, postNewRequest, putUpdateRequest }
 from '../controllers/request.controller';

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
  *       - in: query
  *         name: studentId
  *         schema:
  *           type: string
  *         required: false
  *         description: _id of student in mongodb
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
  *  post:
  *     tags:
  *     - request
  *     summary: post new request
  *     description: student create request
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/RequestInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/RequestGeneralInfo'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/request/{requestId}:
  *  get:
  *     tags:
  *     - request
  *     summary: get detail of a request
  *     description: secretary and vice dean detail of a request
  *     parameters:
  *       - in: path
  *         name: requestId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of request in mongoDB
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
  *               request:
  *                 $ref: '#/components/schemas/RequestGeneralInfo'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  put:
  *     tags:
  *     - request
  *     summary: update request detail
  *     description: update request detail
  *     parameters:
  *       - in: path
  *         name: requestId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of request in mongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/RequestInput'
  *     responses:
  *      200:
  *        description: Success
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               request:
  *                 $ref: '#/components/schemas/RequestGeneralInfo'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  delete:
  *     tags:
  *     - request
  *     summary: delete a request
  *     description: delete a request
  *     parameters:
  *       - in: path
  *         name: requestId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of that request in MongoDB
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

router.get('/', authorizationMiddleware, getListRequest);
router.post('/', authorizationMiddleware, postNewRequest);
router.get('/:requestId', authorizationMiddleware, getRequestDetail);
router.put('/:requestId', authorizationMiddleware, putUpdateRequest);
router.delete('/:requestId', authorizationMiddleware, deleteRemoveARequest);

export const requestRouter: Router = router;