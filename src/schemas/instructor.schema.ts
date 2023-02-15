 /**
  * @openapi
  * components:
  *  schemas:
  *    Instructor:
  *      type: object
  *      properties:
  *        _id:
  *          type: string
  *          example: 0000122123112
  *        name:
  *          type: string
  *          example: Staff 1
  *        gender:
  *          type: string
  *          example: Nam
  *        phoneNumber:
  *          type: string
  *          example: 0123456789
  *        email:
  *          type: string
  *          example: staff1@gmail.com
  *        staffId:
  *          type: string
  *          example: 1234567
  *        birthDate:
  *          type: string
  *          example: 01/01/2022
  *        academyRank:
  *          type: string
  *          example: Giáo sư
  *        degree:
  *          type: string
  *          example: Tiến sỹ
  *    Instructors:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/Instructor'
  */