import { object, string, TypeOf, boolean, number } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    TopicGeneralInfo:
  *      type: object
  *      required:
  *        - name
  *        - type
  *        - startTime
  *        - endTime
  *        - isExtended
  *        - status
  *        - period
  *        - studentId
  *        - createionDate
  *        - productPath
  *      properties:
  *        _id:
  *          type: string
  *          example: 1acd23
  *        name:
  *          type: string
  *          example: Hệ thống 1
  *        type:
  *          type: string
  *          example: chính quy
  *        startTime:
  *          type: string
  *          example: 01/01/2023
  *        endTime:
  *          type: string
  *          example: 01/05/2023
  *        isExtended:
  *          type: boolean
  *          example: true
  *        extensionTime:
  *          type: number
  *          example: 3
  *        expense:
  *          type: number
  *          example: 5000000
  *        status:
  *          type: string
  *          example: Tạo mới
  *        period:
  *          type: string
  *          example: HK232
  *        studentId:
  *          type: string
  *          example: 1234567
  *        topicGivenId:
  *          type: string
  *          example: TPH60523
  *        student:
  *          type: array
  *          items: 
  *            type: object
  *            properties:
  *              _id:
  *                type: string
  *                example: 12341234
  *              name:
  *                type: string
  *                example: Minh Duy
  *        creationDate:
  *          type: string
  *          example: 01/01/2023
  *        productPath:
  *          type: string
  *          example: 
  *    otherMemberInfo:
  *      type: object
  *      properties:
  *        _id:
  *          type: string
  *          example: 1acd23ng
  *        studentId:
  *          type: string
  *          example: 1
  *        fmName:
  *          type: string
  *          example: 
  *        name:
  *          type: string
  *          example: member 1
  *        gender:
  *          type: string
  *          example: Nam
  *        email:
  *          type: string
  *          example: mem1@gmail.com
  *        phoneNumber:
  *          type: string
  *          example: 1212343434
  *        educationType:
  *          type: string
  *          example: Chính quy
  *        birthDate:
  *          type: string
  *          example: 01/01/2001
  *    instructorInfo:
  *      type: object
  *      properties:
  *        _id:
  *          type: string
  *          example: 1acd23ng
  *        staffId:
  *          type: string
  *          example: 1
  *        fmName:
  *          type: string
  *          example: 
  *        name:
  *          type: string
  *          example: instructor 1
  *        gender:
  *          type: string
  *          example: Nam
  *        email:
  *          type: string
  *          example: instructor1@gmail.com
  *        phoneNumber:
  *          type: string
  *          example: 1212343434
  *        birthDate:
  *          type: string
  *          example: 01/01/2001
  *        academyRank:
  *          type: string
  *          example: GS
  *        degree:
  *          type: string
  *          example: TS
  *    TopicDetail:
  *      type: object
  *      required:
  *        - name
  *        - type
  *        - startTime
  *        - endTime
  *        - isExtended
  *        - status
  *        - period
  *        - studentId
  *        - createionDate
  *        - productPath
  *      properties:
  *        _id:
  *          type: string
  *          example: 1acd23
  *        name:
  *          type: string
  *          example: Hệ thống 1
  *        type:
  *          type: string
  *          example: chính quy
  *        startTime:
  *          type: string
  *          example: 01/01/2023
  *        endTime:
  *          type: string
  *          example: 01/05/2023
  *        isExtended:
  *          type: boolean
  *          example: true
  *        extensionTime:
  *          type: number
  *          example: 3
  *        expense:
  *          type: number
  *          example: 5000000
  *        status:
  *          type: string
  *          example: Tạo mới
  *        period:
  *          type: string
  *          example: HK232
  *        studentId:
  *          type: string
  *          example: 1234567
  *        topicGivenId:
  *          type: string
  *          example: TPH60523
  *        student:
  *          type: array
  *          items: 
  *            type: object
  *            properties:
  *              _id:
  *                type: string
  *                example: 12341234
  *              name:
  *                type: string
  *                example: Minh Duy
  *        creationDate:
  *          type: string
  *          example: 01/01/2023
  *        productPath:
  *          type: string
  *          example: 
  *        otherMembers:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/otherMemberInfo'
  *        instructors:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/instructorInfo'
  *    TopicInput:
  *      type: object
  *      required:
  *        - name
  *        - type
  *        - period
  *        - student
  *        - instructorId
  *      properties:
  *        name:
  *          type: string
  *          example: Hệ thống 1
  *        type:
  *          type: string
  *          example: chính quy
  *        expense:
  *          type: number
  *          example: 5000000
  *        status:
  *          type: string
  *          example: Tạo mới
  *        period:
  *          type: string
  *          example: HK232
  *        studentId:
  *          type: string
  *          example: 1234567
  *        student:
  *          type: object
  *          properties:
  *            _id:
  *              type: string
  *              example: 12341234
  *            name:
  *              type: string
  *              example: Minh Duy
  *        otherMembers:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/otherMemberInfo'
  *        instructorId:
  *          type: array
  *          items: string
  *    TopicsGeneralListResponse:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/TopicGeneralInfo'
  */