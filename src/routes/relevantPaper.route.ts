import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import multer, { Multer } from 'multer';
import { deleteRemoveAPaper, downloadPaperAttachedFile, postAddARelevantPaper, putUpdateARelevantPaper } from '../controllers/relevantPaper.controller';

const upload: Multer = multer({dest: './uploads/papers', limits: {
  fields: 20,
  fileSize: 100 * 1024 * 1024, //calculate in byte
  parts: 20
}});

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: paper
  *     description: For relevant paper
  * /api/paper/:
  *  post:
  *     tags:
  *     - paper
  *     summary: create new paper
  *     description: student create a new paper
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/PaperInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/PaperResponse'
  *      400:
  *        description: Bad request
  *  put:
  *     tags:
  *     - paper
  *     summary: update a paper
  *     description: student update a new paper
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/PaperUpdateInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/PaperResponse'
  *      400:
  *        description: Bad request
  * /api/paper/{paperId}:
  *  delete:
  *     tags:
  *     - paper
  *     summary: delete a paper
  *     description: student delete a paper
  *     parameters:
  *       - in: path
  *         name: paperId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of paper in mongoDB
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
  * /api/paper/{paperId}/download:
  *  get:
  *     tags:
  *     -  paper
  *     summary: get to download paper
  *     description: get to download paper
  *     parameters:
  *       - in: path
  *         name: paperId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of paper
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
router.post('/', upload.single('file'), authorizationMiddleware, postAddARelevantPaper);
router.put('/', upload.single('file'), authorizationMiddleware, putUpdateARelevantPaper);
router.delete('/:paperId', authorizationMiddleware, deleteRemoveAPaper)
router.get('/:paperId/download', downloadPaperAttachedFile);

export const relevantPaperRouter: Router = router;