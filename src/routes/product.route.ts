import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import multer, { Multer } from 'multer';
import { deleteRemoveAProduct, downloadProductAttachedFile, getAProductById, getAProductByTopicId, postAddAProduct, putUpdateAProduct } from '../controllers/product.controller';

const upload: Multer = multer({dest: './uploads/products', limits: {
  fields: 20,
  fileSize: 1000 * 1024 * 1024, //calculate in byte
  parts: 20
}});

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: product
  *     description: For relevant product
  * /api/product/:
  *  post:
  *     tags:
  *     - product
  *     summary: add new product
  *     description: student add a new product
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/ProductInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ProductResponse'
  *      400:
  *        description: Bad request
  * /api/product/{productId}:
  *  get:
  *     tags:
  *     - product
  *     summary: get a product by id
  *     description: student get a product by id
  *     parameters:
  *       - in: path
  *         name: productId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of product in mongoDB
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ProductResponse'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  put:
  *     tags:
  *     - product
  *     summary: update a product
  *     description: student update a new product
  *     parameters:
  *       - in: path
  *         name: productId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of product in mongoDB
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/ProductUpdateInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ProductResponse'
  *      400:
  *        description: Bad request
  *  delete:
  *     tags:
  *     - product
  *     summary: delete a product
  *     description: student delete a product
  *     parameters:
  *       - in: path
  *         name: productId
  *         required: true
  *         scheme:
  *           type: string
  *         description: _id of product in mongoDB
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
  * /api/product/getByTopicId/{topicId}:
  *  get:
  *     tags:
  *     - product
  *     summary: get a product by topic id
  *     description: student get a product by topic id
  *     parameters:
  *       - in: path
  *         name: topicId
  *         required: true
  *         scheme:
  *           type: string
  *         description: topic id of product in mongoDB
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/ProductResponse'
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/product/{productId}/download:
  *  get:
  *     tags:
  *     -  product
  *     summary: get to download product
  *     description: get to download product
  *     parameters:
  *       - in: path
  *         name: productId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of product
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
router.post('/', upload.single('file'), authorizationMiddleware, postAddAProduct);
router.get('/:productId', authorizationMiddleware, getAProductById);
router.put('/:productId', upload.single('file'), authorizationMiddleware, putUpdateAProduct);
router.delete('/:productId', authorizationMiddleware, deleteRemoveAProduct);
router.get('/getByTopicId/:topicId', authorizationMiddleware, getAProductByTopicId);
router.get('/:productId/download', downloadProductAttachedFile);

export const productRouter: Router = router;