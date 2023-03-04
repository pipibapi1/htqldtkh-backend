/**
  * @openapi
  * components:
  *  schemas:
  *    FormInput:
  *      type: object
  *      required:
  *        - templateId
  *        - fields
  *      properties:
  *        templateId:
  *          type: string
  *          example: _id of template in mongodb
  *        fields:
  *          type: object
  *          properties:
  *            initialName:
  *              type: string
  *              example: {{name}}
  *            name:
  *              type: string
  *              example: name
  *            note:
  *              type: string
  *              example: chu thich cho truong du lieu
  *            dataType:
  *              type: string
  *              example: 'van ban'
  *    FormResponse:
  *      type: object
  *      required:
  *        - templateId
  *        - fields
  *        - createAt
  *        - fileType
  *      properties:
  *        templateId:
  *          type: string
  *          example: _id of template in mongodb
  *        fields:
  *          type: object
  *          properties:
  *            initialName:
  *              type: string
  *              example: "{{name}}"
  *            name:
  *              type: string
  *              example: name
  *            note:
  *              type: string
  *              example: chu thich cho truong du lieu
  *            dataType:
  *              type: string
  *              example: 'van ban'
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        fileType:
  *          type: string
  *          example: pdf
  */