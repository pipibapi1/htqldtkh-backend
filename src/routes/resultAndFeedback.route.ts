import express, {Router} from 'express';
import multer from 'multer';
import { resultAndFeedback } from '../controllers/resultAndFeedback.controller';

const upload = multer({
    storage: multer.memoryStorage()
});

const router: Router = express.Router(); 
/**
  * @openapi
  * tags:
  *   - name: resultAndFeedback
  *     description: For sending results and feedbacks
  * /api/resultAndFeedback:
  *  post:
  *     tags:
  *     - resultAndFeedback
  *     summary: For sending results and feedbacks
  *     description: user sends results and feedbacks
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/EmailInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Send email successfully!
  *      400:
  *        description: Bad request
  */
router.post('/',upload.single('file'), resultAndFeedback);

export const resultAndFeedbackRouter: Router = router;