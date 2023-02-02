import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllFacultySecretary, getFacultySecretaryById, postAddFacultySecretary,
putUpdateAFacultySecretary, deleteRemoveAFacultySecretary } from '../controllers/facultySecretary.controller';

const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: secretary
  *     description: Everything about faculty secretary
  * /api/secretary:
  *  get:
  *     tags:
  *     - secretary
  *     summary: get secretary account list
  *     description: get secretary account list
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
  *         description: name of secretary, use for full text search
  *       - in: query
  *         name: email
  *         schema:
  *           type: string
  *           example: duy@gmail.com
  *         required: false
  *         description: email of secretary, use for full text search
  *       - in: query
  *         name: phoneNumber
  *         schema:
  *           type: string
  *           example: 5
  *         required: false
  *         description: phoneNumber of secretary, use for full text search
  *       - in: query
  *         name: staffId
  *         schema:
  *           type: string
  *           example: 5
  *         required: false
  *         description: staffId of secretary, use for search
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
  *                secretarys:
  *                  $ref: '#/components/schemas/SecretarysListResponse'
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
  *     - secretary
  *     summary: create new secretary account 
  *     description: create new secretary account
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              secretary:
  *                $ref: '#/components/schemas/SecretaryInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                secretary:
  *                  $ref: '#/components/schemas/SecretaryResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/secretary/{_id}:
  *  get:
  *     tags:
  *     - secretary
  *     summary: get secretary account detail 
  *     description: get secretary account detail by secretary id
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of that faculty secretary in MongoDB
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
  *                secretary:
  *                  $ref: '#/components/schemas/SecretaryResponse'
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
  *     - secretary
  *     summary: change secretary account info
  *     description: change secretary account info
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of that faculty secretary in MongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              secretary:
  *                $ref: '#/components/schemas/SecretaryInput'
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
  *     - secretary
  *     summary: delete secretary account
  *     description: delete secretary account 
  *     parameters:
  *       - in: path
  *         name: _id
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of that faculty secretary
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

router.get('/:_id', authorizationMiddleware, getFacultySecretaryById);
router.get('/', authorizationMiddleware, getAllFacultySecretary);
router.post('/', authorizationMiddleware, postAddFacultySecretary);
router.put('/:_id', authorizationMiddleware, putUpdateAFacultySecretary);
router.delete('/:_id', authorizationMiddleware, deleteRemoveAFacultySecretary);

export const facultySecretaryRouter: Router = router;