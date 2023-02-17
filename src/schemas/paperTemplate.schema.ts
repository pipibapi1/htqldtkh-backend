
/**
  * @openapi
  * components:
  *  schemas:
  *    TemplateInput:
  *      type: object
  *      required:
  *        - name
  *        - forStudent
  *      properties:
  *        name:
  *          type: string
  *          example: thuyet minh
  *        forStudent:
  *          type: boolean
  *          example: true
  *    TemplateResponse:
  *      type: object
  *      required:
  *        - name
  *        - forStudent
  *        - createAt
  *        - fileType
  *      properties:
  *        name:
  *          type: string
  *          example: file 1
  *        forStudent:
  *          type: boolean
  *          example: description 1
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        fileType:
  *          type: string
  *          example: pdf
  *    Template:
  *      type: object
  *      required:
  *        - _id
  *        - name
  *      properties:
  *        _id:
  *          type: string
  *          example: 6dfhekjdfh823487
  *        name:
  *          type: string
  *          example: Thuyết minh
  *    TemplateWithPaper:
  *      type: object
  *      required:
  *        - _id
  *        - name
  *        - paperFile
  *      properties:
  *        _id:
  *          type: string
  *          example: 6dfhekjdfh823487
  *        name:
  *          type: string
  *          example: Thuyết minh
  *        paperFile:
  *          $ref: '#/components/schemas/Paper'
  */