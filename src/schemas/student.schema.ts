/**
  * @openapi
  * components:
  *  schemas:
  *    StudentInput:
  *      type: object
  *      required:
  *        - name
  *        - gender
  *        - phoneNumber
  *        - email
  *        - username
  *        - password
  *        - studentId
  *        - image
  *        - educationType
  *        - birthDate
  *      properties:
  *        name:
  *          type: string
  *          example: Student 1
  *        gender:
  *          type: string
  *          example: Nam
  *        phoneNumber:
  *          type: string
  *          example: 0123456789
  *        email:
  *          type: string
  *          example: student1@gmail.com
  *        username:
  *          type: string
  *          example: student1
  *        password:
  *          type: string
  *          example: 12345678
  *        studentId:
  *          type: string
  *          example: 1234567
  *        image:
  *          type: string
  *          example: http://
  *        educationType:
  *          type: string
  *          example: chính quy
  *        birthDate:
  *          type: string
  *          example: 01/01/2022
  *    StudentResponse:
  *      type: object
  *      required:
  *        - _id
  *        - name
  *        - gender
  *        - phoneNumber
  *        - email
  *        - username
  *        - password
  *        - studentId
  *        - image
  *        - educationType
  *        - birthDate
  *      properties:
  *        _id:
  *          type: string
  *          example: 0000122123112
  *        name:
  *          type: string
  *          example: Student 1
  *        gender:
  *          type: string
  *          example: Nam
  *        phoneNumber:
  *          type: string
  *          example: 0123456789
  *        email:
  *          type: string
  *          example: student1@gmail.com
  *        username:
  *          type: string
  *          example: student1
  *        password:
  *          type: string
  *          example: 12345678
  *        studentId:
  *          type: string
  *          example: 1234567
  *        image:
  *          type: string
  *          example: http://
  *        educationType:
  *          type: string
  *          example: chính quy
  *          enum: [chính quy, chất lượng cao, kỹ sư tài năng, chất lượng cao (luận văn)]
  *        birthDate:
  *          type: string
  *          example: 01/01/2022
  *    StudentsListResponse:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/StudentResponse'
  */