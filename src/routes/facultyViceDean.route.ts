import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllFacultyViceDean, getFacultyViceDeanById, postAddFacultyViceDean, putUpdateAFacultyViceDean,
deleteRemoveAFacultyViceDean} from '../controllers/facultyViceDean.controller';

const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: vicedean
  *     description: Everything about faculty vice dean
  * /api/vicedean:
  *  get:
  *     tags:
  *     - vicedean
  *     summary: get vice dean account list
  *     description: get vice dean account list
  *     parameters:
  *       - in: query
  *         name: page
  *         schema:
  *           type: string
  *           example: 1
  *         required: false
  *         description: page num
  *       - in: query
  *         name: limit
  *         schema:
  *           type: string
  *           example: 5
  *         required: false
  *         description: num item per page
  *       - in: query
  *         name: name
  *         schema:
  *           type: string
  *           example: duy
  *         required: false
  *         description: name of vice dean, use for full text search
  *       - in: query
  *         name: email
  *         schema:
  *           type: string
  *           example: duy@gmail.com
  *         required: false
  *         description: email of vice dean, use for full text search
  *       - in: query
  *         name: phoneNumber
  *         schema:
  *           type: string
  *           example: 5
  *         required: false
  *         description: phoneNumber of vice dean, use for full text search
  *       - in: query
  *         name: staffId
  *         schema:
  *           type: string
  *           example: 5
  *         required: false
  *         description: staffId of vice dean, use for search
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                viceDeans:
  *                  $ref: '#/components/schemas/ViceDeansListResponse'
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
  *     - vicedean
  *     summary: create new vice dean account 
  *     description: create new vice dean account
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              viceDean:
  *                $ref: '#/components/schemas/ViceDeanInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ViceDeanResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/vicedean/{_id}:
  *  get:
  *     tags:
  *     - vicedean
  *     summary: get vice dean account detail by vice dean id
  *     description: get vice dean account detail
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of that faculty vice dean in MongoDB
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ViceDeanResponse'
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
  *     - vicedean
  *     summary: change vice dean account info
  *     description: change vice dean account info
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of that faculty vice dean in MongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              viceDean:
  *                $ref: '#/components/schemas/ViceDeanInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ViceDeanResponse'
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
  *     - vicedean
  *     summary: delete vice dean account
  *     description: delete vice dean account 
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of that faculty vice dean in MongoDB
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

router.get('/:_id', authorizationMiddleware, getFacultyViceDeanById);
router.get('/', authorizationMiddleware, getAllFacultyViceDean);
router.post('/', authorizationMiddleware, postAddFacultyViceDean);
router.put('/:_id', authorizationMiddleware, putUpdateAFacultyViceDean);
router.delete('/:_id', authorizationMiddleware, deleteRemoveAFacultyViceDean);

export const facultyViceDeanRouter: Router = router;