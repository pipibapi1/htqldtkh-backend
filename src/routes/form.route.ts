import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import multer, { Multer } from 'multer';
import { deleteRemoveAForm, downloadFormMarkedTemplateAttachedFile, getAFormById, getFormMarkedTemplateAttachedFile, postAddAForm, putUpdateAForm } from '../controllers/form.controller';

const upload: Multer = multer({dest: './uploads/forms', limits: {
    fields: 20,
    fileSize: 100 * 1024 * 1024, //calculate in byte
    parts: 20
}});

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: form
  *     description: For form
  * /api/form/:
  *  post:
  *     tags:
  *     - form
  *     summary: create new form
  *     description: vice dean create a new form
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/FormInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/FormResponse'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  * /api/form/{formId}:
  *  get:
  *     tags:
  *     - form
  *     summary: get a form
  *     description: fs get the detail of a form
  *     parameters:
  *       - in: path
  *         name: formId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of form in mongoDB
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/FormResponse'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  put:
  *     tags:
  *     - form
  *     summary: update a form
  *     description: fs update a form
  *     parameters:
  *       - in: path
  *         name: formId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of form
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               form:
  *                 $ref: '#/components/schemas/FormInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/FormResponse'
  *      400:
  *        description: Bad request
  *  delete:
  *     tags:
  *     - form
  *     summary: delete a form
  *     description: fs delete a form
  *     parameters:
  *       - in: path
  *         name: formId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of form in mongoDB
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
  * /api/form/{formId}/markedTemplateFile:
  *  get:
  *     tags:
  *     - form
  *     summary: get form marked template file
  *     description: get form marked template file
  *     parameters:
  *       - in: path
  *         name: formId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of form
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/octet-stream:
  *            schema:
  *              type: string
  *              format: binary
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/form/{formId}/download:
  *  get:
  *     tags:
  *     -  form
  *     summary: get to download marked template file of a form
  *     description: get to download marked template file of a form
  *     parameters:
  *       - in: path
  *         name: formId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of form
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *            schema:
  *              type: string
  *              format: binary
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.post('/', upload.single('file'), authorizationMiddleware, postAddAForm);
router.get('/:formId', authorizationMiddleware, getAFormById);
router.put('/:formId', authorizationMiddleware, putUpdateAForm);
router.delete('/:formId', authorizationMiddleware, deleteRemoveAForm);
router.get('/:formId/markedTemplateFile', getFormMarkedTemplateAttachedFile);
router.get('/:formId/download', downloadFormMarkedTemplateAttachedFile);

export const formRouter: Router = router;