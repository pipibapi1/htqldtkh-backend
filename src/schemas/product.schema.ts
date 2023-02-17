
/**
  * @openapi
  * components:
  *  schemas:
  *    Product:
  *      type: object
  *      required:
  *        - _id
  *        - productFileName
  *      properties:
  *        _id:
  *          type: string
  *          example: 6dfhekjdfh823487
  *        productFileName:
  *          type: string
  *          example: SV_thuyetminh
  *    ProductInput:
  *      type: object
  *      required:
  *        - topicId
  *      properties:
  *        topicId:
  *          type: string
  *          example: TP120
  *    ProductUpdateInput:
  *      type: object
  *      required:
  *        - topicId
  *      properties:
  *        topicId:
  *          type: string
  *          example: TP120
  *    ProductResponse:
  *      type: object
  *      required:
  *        - topicId
  *        - createAt
  *        - fileType
  *      properties:
  *        topicId:
  *          type: string
  *          example: TP120
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        fileType:
  *          type: string
  *          example: pdf
  */