import { object, string, TypeOf, boolean, number } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    TopicGeneralInfo:
  *      type: object
  *      required:
  *        - name
  *        - type
  *        - startTime
  *        - endTime
  *        - isExtended
  *        - status
  *        - period
  *        - studentId
  *        - createionDate
  *        - productPath
  *      properties:
  *        _id:
  *          type: string
  *          example: 1acd23
  *        name:
  *          type: string
  *          example: Hệ thống 1
  *        type:
  *          type: string
  *          example: chính quy
  *        startTime:
  *          type: string
  *          example: 01/01/2023
  *        endTime:
  *          type: string
  *          example: 01/05/2023
  *        isExtended:
  *          type: boolean
  *          example: true
  *        extensionTime:
  *          type: number
  *          example: 3
  *        status:
  *          type: string
  *          example: Tạo mới
  *        period:
  *          type: string
  *          example: HK232
  *        studentId:
  *          type: string
  *          example: 1234567
  *        student:
  *          type: array
  *          items: 
  *            type: object
  *            properties:
  *              _id:
  *                type: string
  *                example: 12341234
  *              name:
  *                type: string
  *                example: Minh Duy
  *        creationDate:
  *          type: string
  *          example: 01/01/2023
  *        productPath:
  *          type: string
  *          example: 
  *    TopicsGeneralListResponse:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/TopicGeneralInfo'
  */