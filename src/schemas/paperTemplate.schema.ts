
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
  */