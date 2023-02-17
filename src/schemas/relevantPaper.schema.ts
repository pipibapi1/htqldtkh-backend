
/**
  * @openapi
  * components:
  *  schemas:
  *    Paper:
  *      type: object
  *      required:
  *        - _id
  *        - paperFileName
  *      properties:
  *        _id:
  *          type: string
  *          example: 6dfhekjdfh823487
  *        paperFileName:
  *          type: string
  *          example: SV_thuyetminh
  *    PaperInput:
  *      type: object
  *      required:
  *        - topicId
  *        - templateId
  *      properties:
  *        topicId:
  *          type: string
  *          example: TP120
  *        templateId:
  *          type: boolean
  *          example: TL123
  *    PaperUpdateInput:
  *      type: object
  *      required:
  *        - topicId
  *        - templateId
  *      properties:
  *        topicId:
  *          type: string
  *          example: TP120
  *        templateId:
  *          type: boolean
  *          example: TL123
  *    PaperResponse:
  *      type: object
  *      required:
  *        - topicId
  *        - templateId
  *        - createAt
  *        - fileType
  *      properties:
  *        topicId:
  *          type: string
  *          example: TP120
  *        templateId:
  *          type: string
  *          example: TL123
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        fileType:
  *          type: string
  *          example: pdf
  */