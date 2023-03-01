import express, {Router} from 'express';
import multer, { Multer } from 'multer';
import { sendEmail } from '../controllers/sendEmail.controller';

const upload = multer({
    storage: multer.memoryStorage()
});

const router: Router = express.Router(); 
/**
  * @openapi
  * tags:
  *   - name: sendEmail
  *     description: For sending email
  * /api/sendEmail:
  *  post:
  *     tags:
  *     - sendEmail
  *     summary: send email
  *     description: user send email
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
router.post('/',upload.single('file'), sendEmail);

export const sendEmailRouter: Router = router;