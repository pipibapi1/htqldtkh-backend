 /**
  * @openapi
  * components:
  *  schemas:
  *    Period:
  *      type: object
  *      required:
  *        - status
  *        - period
  *        - createAt
  *      properties:
  *        _id:
  *          type: string
  *          example: id in mongoDB
  *        status:
  *          type: string
  *          example: mở
  *        period:
  *          type: string
  *          example: 06/2022
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *    Periods:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/Period'
  */