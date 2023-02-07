/**
  * @openapi
  * components:
  *  schemas:
  *    RequestGeneralInfo:
  *      type: object
  *      required:
  *        - status
  *        - type
  *        - studentId
  *        - topicId
  *        - createAt
  *      properties:
  *        _id:
  *          type: string
  *          example: id in mongoDB
  *        status:
  *          type: string
  *          example: Chờ xét duyệt
  *        type:
  *          type: string
  *          example: Xin giấy chứng nhận
  *        studentId:
  *          type: string
  *          example: id account in mongoDB 
  *        studentName:
  *          type: string
  *          example: student1
  *        topicId:
  *          type: string
  *          example: id in mongoDB
  *        topicName:
  *          type: string
  *          example: Hệ thống quản lý đề tài khoa học cấp sinh viên
  *        extensionTime:
  *          type: number
  *          example: 3
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *    RequestGeneralInfoList:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/RequestGeneralInfo'
  *    RequestInput:
  *      type: object
  *      required:
  *        - type
  *        - topicId
  *      properties:
  *        type:
  *          type: string
  *          example: Xin giấy chứng nhận
  *        studentId:
  *          type: string
  *          example: id account in mongoDB
  *        topicId:
  *          type: string
  *          example: id in mongoDB
  *        extensionTime:
  *          type: number
  *          example: 3
  */