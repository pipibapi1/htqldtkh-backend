import { object, string, TypeOf } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    AnnouncementInput:
  *      type: object
  *      required:
  *        - title
  *        - content
  *      properties:
  *        title:
  *          type: string
  *          example: file 1
  *        content:
  *          type: string
  *          example: description 1
  *    AnnouncementResponse:
  *      type: object
  *      required:
  *        - title
  *        - content
  *        - createAt
  *        - fileType
  *      properties:
  *        title:
  *          type: string
  *          example: file 1
  *        content:
  *          type: string
  *          example: description 1
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        fileType:
  *          type: string
  *          example: pdf
  *    AnnouncementsListResponse:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/AnnouncementResponse'
  */