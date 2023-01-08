import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllFacultyViceDean, getFacultyViceDeanById, postAddFacultyViceDean, putUpdateAFacultyViceDean,
deleteRemoveAFacultyViceDean} from '../controllers/facultyViceDean.controller';

const router: Router = express.Router();

/**
  * @openapi
  * /api/vicedean:
  *  get:
  *     tags:
  *     - get list vice dean account
  *     summary: get vice dean account list
  *     description: get vice dean account list
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/viceDeansListResponse'
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
  *     - add a new faculty vice dean account
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
  *                $ref: '#/components/schemas/viceDeanInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/viceDeanResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/vicedean/{viceDeanId}:
  *  get:
  *     tags:
  *     - get vice dean account detail
  *     summary: get vice dean account detail by vice dean id
  *     description: get vice dean account detail
  *     parameters:
  *       - in: path
  *         name: viceDeanId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of that faculty vice dean
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/viceDeanResponse'
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
  *     - change vice dean account info
  *     summary: change vice dean account info
  *     description: change vice dean account info
  *     parameters:
  *       - in: path
  *         name: viceDeanId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of that faculty vice dean
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              viceDean:
  *                $ref: '#/components/schemas/viceDeanInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/viceDeanResponse'
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
  *     - delete vice dean account
  *     summary: delete vice dean account
  *     description: delete vice dean account 
  *     parameters:
  *       - in: path
  *         name: viceDeanId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of that faculty vice dean
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

router.get('/:viceDeanId', authorizationMiddleware, getFacultyViceDeanById);
router.get('/', authorizationMiddleware, getAllFacultyViceDean);
router.post('/', authorizationMiddleware, postAddFacultyViceDean);
router.put('/:viceDeanId', authorizationMiddleware, putUpdateAFacultyViceDean);
router.delete('/:viceDeanId', authorizationMiddleware, deleteRemoveAFacultyViceDean);

export const facultyViceDeanRouter: Router = router;