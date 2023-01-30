import { object, string, TypeOf, array } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    SecretaryInput:
  *      type: object
  *      required:
  *        - email
  *        - name
  *        - gender
  *        - username
  *        - password
  *        - staffId
  *        - birthDate
  *      properties:
  *        email:
  *          type: string
  *          example: secretary@exa.com
  *        name:
  *          type: string
  *          example: Pham Minh Duy
  *        username:
  *          type: string
  *          example: secretary
  *        password:
  *          type: string
  *          example: 12345678
  *        staffId:
  *          type: string
  *          example: 1
  *        gender:
  *          type: string
  *          example: Nam
  *        birthDate:
  *          type: string
  *          example: 16/02/2001
  *    SecretaryResponse:
  *      type: object
  *      required:
  *        - _id
  *        - email
  *        - name
  *        - gender
  *        - username
  *        - password
  *        - staffId
  *        - birthDate
  *        - accountCreationDate
  *      properties:
  *        _id:
  *          type: string
  *          example: 00000101010101
  *        email:
  *          type: string
  *          example: secretary@exa.com
  *        name:
  *          type: string
  *          example: Secretary
  *        username:
  *          type: string
  *          example: secretary
  *        password:
  *          type: string
  *          example: 12345678
  *        staffId:
  *          type: string
  *          example: 1
  *        gender:
  *          type: string
  *          example: Nam
  *        birthDate:
  *          type: string
  *          example: 16/02/2001
  *        accountCreationDate:
  *          type: string
  *          example: 01/01/2023
  *    SecretarysListResponse:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/ViceDeanInput'
  */