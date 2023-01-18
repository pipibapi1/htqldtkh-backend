import express, {Router} from 'express';
import { postAddAnnouncement, getAnnouncementDataById, getListAnnouncement, 
  getAnnouncementAttachedFileById, downloadAnnouncementAttachedFile }
from '../controllers/announcement.controller';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import multer, { Multer } from 'multer';

const upload: Multer = multer({dest: './uploads/announcements', limits: {
  fields: 20,
  fileSize: 100 * 1024 * 1024, //calculate in byte
  parts: 20
}});

const router: Router = express.Router();
/**
  * @openapi
  * tags:
  *   - name: announcement
  *     description: For announcement
  * /api/announcement/:
  *  post:
  *     tags:
  *     - announcement
  *     summary: create new announcement
  *     description: vice dean create a new announcement 
  *     requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               info:
  *                 $ref: '#/components/schemas/AnnouncementInput'
  *               file:
  *                 type: string
  *                 format: binary
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/AnnouncementResponse'
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
  *     - announcement
  *     summary: get a list announcement
  *     description: get a list announcement. page=1 and limit=1 to get latest announcement
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/AnnouncementsListResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/announcement/{announcementId}/data:
  *  get:
  *     tags:
  *     - announcement
  *     summary: get announcement detail
  *     description: get announcement detail
  *     parameters:
  *       - in: path
  *         name: announcementId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of announcement
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/AnnouncementResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/announcement/{announcementId}/file:
  *  get:
  *     tags:
  *     - announcement
  *     summary: get announcement detail
  *     description: get announcement detail
  *     parameters:
  *       - in: path
  *         name: announcementId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of announcement
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
  * /api/announcement/{announcementId}/download:
  *  get:
  *     tags:
  *     - announcement
  *     summary: get announcement detail
  *     description: get announcement detail
  *     parameters:
  *       - in: path
  *         name: announcementId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of announcement
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/pdf:
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
  */
router.post('/', upload.single('file'), authorizationMiddleware, postAddAnnouncement);
router.get('/', getListAnnouncement);
router.get('/:announcementId/data', getAnnouncementDataById);
router.get('/:announcementId/file', getAnnouncementAttachedFileById);
router.get('/:announcementId/download', downloadAnnouncementAttachedFile);

export const announcementRouter: Router = router;