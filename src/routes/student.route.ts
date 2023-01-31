import express, {Router} from 'express';
import { getListStudent, getStudentById, postAddAStudent, 
    deleteAStudent, putUpdateAStudent } 
from '../controllers/student.controller';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';

const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: student
  *     description: For student
  * /api/student/:
  *  post:
  *     tags:
  *     - student
  *     summary: add new student account
  *     description: secretary add new student account
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/StudentInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/StudentResponse'
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
  *     - student
  *     summary: get a list student
  *     description: secretary and vice dean get a list student 
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
  *         name: name
  *         schema:
  *           type: string
  *         required: false
  *         description: name of student use for full-text search
  *       - in: query
  *         name: email
  *         schema:
  *           type: string
  *         required: false
  *         description: email of student use for full-text search
  *       - in: query
  *         name: phoneNumber
  *         schema:
  *           type: string
  *         required: false
  *         description: phoneNumber of student use for full-text search
  *       - in: query
  *         name: studentId
  *         schema:
  *           type: string
  *         required: false
  *         description: studentId, use for search
  *       - in: query
  *         name: status
  *         schema:
  *           type: string
  *           enum: [đã duyệt, chờ duyệt]
  *         required: false
  *         description: account ststus, use for filter
  *       - in: query
  *         name: eduType
  *         schema:
  *           type: string
  *           enum: [chính quy, chất lượng cao, kỹ sư tài năng, chất lượng cao (luận văn)]
  *         required: false
  *         description: education type, use for filter
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
  *               students:
  *                 $ref: '#/components/schemas/StudentsListResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/student/{studentId}:
  *  get:
  *     tags:
  *     - student
  *     summary: get student detail
  *     description: get student detail
  *     parameters:
  *       - in: path
  *         name: studentId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of student in mongoDB 
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
  *               student:
  *                 $ref: '#/components/schemas/StudentResponse'
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
  *     - student
  *     summary: update student detail
  *     description: update student detail
  *     parameters:
  *       - in: path
  *         name: studentId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of student in mongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/StudentInput'
  *     responses:
  *      200:
  *        description: Success
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               student:
  *                 $ref: '#/components/schemas/StudentResponse'
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
  *     - student
  *     summary: delete student
  *     description: secretary and vice dean delete a student account
  *     parameters:
  *       - in: path
  *         name: studentId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of student in mongoDB
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

router.get('/', authorizationMiddleware, getListStudent);
router.get('/:studentId', authorizationMiddleware, getStudentById);
router.post('/', authorizationMiddleware, postAddAStudent);
router.put('/:studentId', authorizationMiddleware, putUpdateAStudent);
router.delete('/:studentId', authorizationMiddleware, deleteAStudent)

export const studentRouter: Router = router;