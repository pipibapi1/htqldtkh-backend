import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import multer, { Multer } from 'multer';
import { downloadTemplateAttachedFile, getAllPaperTemplate, postAddAPaperTemplate } from '../controllers/paperTemplate.controller';

const upload: Multer = multer({dest: './uploads/templates', limits: {
  fields: 20,
  fileSize: 100 * 1024 * 1024, //calculate in byte
  parts: 20
}});

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: template
  *     description: For template
  * /api/template/:
  *  post:
  *     tags:
  *     - template
  *     summary: create new template
  *     description: vice dean create a new template
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/TemplateInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/TemplateResponse'
  *      400:
  *        description: Bad request
  *  get:
  *     tags:
  *     - template
  *     summary: get all paper templates
  *     description: get all paper templates
  *     parameters:
  *       - in: query
  *         name: forStudent
  *         schema:
  *           type: boolean
  *           example: true
  *         required: false
  *         description: the paper template for student or not
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: ''
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  * /api/template/{templateId}/download:
  *  get:
  *     tags:
  *     -  template
  *     summary: get to download paper template
  *     description: get to download paper template
  *     parameters:
  *       - in: path
  *         name: templateId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of template
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
router.post('/', upload.single('file'), postAddAPaperTemplate)
router.get('/',authorizationMiddleware, getAllPaperTemplate);
router.get('/:templateId/download', downloadTemplateAttachedFile);

export const paperTemplateRouter: Router = router;