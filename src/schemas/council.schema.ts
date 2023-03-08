import { object, string, TypeOf, number } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    CouncilInput:
  *      type: object
  *      required:
  *        - name
  *        - type
  *        - period
  *        - time
  *        - date
  *        - place
  *        - numMembers
  *        - numTopics
  *        - members
  *        - topics
  *      properties:
  *        name:
  *          type: string
  *          example: Hội đồng 1 - HK202 - Đợt 1
  *        type:
  *          type: string
  *          enum: ["Xét duyệt", "Nghiệm thu"]
  *        period:
  *          type: string
  *          example: 123456789abcd
  *        time:
  *          type: string
  *          example: 16:00
  *        date:
  *          type: string
  *          example: 16/02/2023
  *        place:
  *          type: string
  *          example: Tòa H6 ĐHBK cơ sở 2
  *        numMembers:
  *          type: number
  *          example: 4
  *        numTopics:
  *          type: number
  *          example: 4
  *        members:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/CouncilMember'
  *        topics:
  *          type: array
  *          items:
  *            type: string
  *            example: 1234567890abcdef
  *    CouncilMember:
  *      type: object
  *      required:
  *        - name
  *        - academyRank
  *        - degree
  *        - workUnit
  *        - role
  *        - gender
  *        - email
  *        - phoneNumber
  *      properties:
  *        name:
  *          type: string
  *          example: council member 1
  *        academyRank:
  *          type: string
  *          enum: ["", "Giáo sư", "Phó giáo sư"]
  *        degree:
  *          type: string
  *          enum: ["Cử nhân", "Thạc sỹ", "Tiến sỹ", ""]
  *        role:
  *          type: string
  *          enum: ["Thư ký", "Ủy viên", "Chủ tịch"]
  *        workUnit:
  *          type: string
  *          example: Đại học Bách khoa
  *        gender:
  *          type: string
  *          enum: ["Nam", "Nữ"]
  *        email:
  *          type: string
  *          example: council.member1@gmail.com
  *        phoneNumber:
  *          type: string
  *          example: 0397700123
  *    CouncilGeneralInfo:
  *      type: object
  *      required:
  *        - name
  *        - type
  *        - status
  *        - period
  *        - time
  *        - date
  *        - place
  *        - numMembers
  *        - numTopics
  *        - lastModified
  *      properties:
  *        name:
  *          type: string
  *          example: Hội đồng 1 - HK202 - Đợt 1
  *        type:
  *          type: string
  *          example: Xét duyệt
  *        status:
  *          type: string
  *          example: Mới
  *        period:
  *          type: string
  *          example: 1234567890abcdef
  *        time:
  *          type: string
  *          example: 16:00
  *        date:
  *          type: string
  *          example: 16/02/2023
  *        place:
  *          type: string
  *          example: Tòa H6 ĐHBK cơ sở 2
  *        numMembers:
  *          type: number
  *          example: 4
  *        numTopics:
  *          type: number
  *          example: 4
  *        lastModified:
  *          type: string
  *          example: 16/01/2023
  *    CouncilDetailInfo:
  *      type: object
  *      required:
  *        - _id
  *        - name
  *        - type
  *        - period
  *        - time
  *        - date
  *        - place
  *        - numMembers
  *        - numTopics
  *        - members
  *        - topicGeneralInfos
  *        - lastModified
  *      properties:
  *        _id:
  *          type: string
  *          example: 0123456789abcdef
  *        name:
  *          type: string
  *          example: Hội đồng 1 - HK202 - Đợt 1
  *        type:
  *          type: string
  *          enum: ["Xét duyệt", "Nghiệm thu"]
  *        period:
  *          type: string
  *          example: 123456789abcd
  *        time:
  *          type: string
  *          example: 16:00
  *        date:
  *          type: string
  *          example: 16/02/2023
  *        place:
  *          type: string
  *          example: Tòa H6 ĐHBK cơ sở 2
  *        numMembers:
  *          type: number
  *          example: 4
  *        numTopics:
  *          type: number
  *          example: 4
  *        members:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/CouncilMember'
  *        topicGeneralInfos:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/TopicInCouncil'
  *        lastModified:
  *          type: string
  *          example: 15/02/2023
  *    TopicInCouncil:
  *      type: object
  *      required:
  *      properties:
  *        topicGivenId:
  *          type: string
  *          example: HK212-DTNCKHCSV
  *        name:
  *          type: string
  *          example: Hệ thống 1
  *        studentId:
  *          type: string
  *          example: 123456789abcdef
  *        studentName:
  *          type: string
  *          example: student 1
  *        acceptanceResult:
  *          type: string
  *          example: Đạt
  *        reviewResult:
  *          type: string
  *          example: Đạt
  *        expense:
  *          type: number
  *          example: 5000000
  *        instructorsName:
  *          type: array
  *          items:
  *            type: string
  *    CouncilUpdateData:
  *      type: object
  *      properties:
  *        name:
  *          type: string
  *          example: Hội đồng 1 - HK202 - Đợt 1
  *        status:
  *          type: string
  *          example: Mới
  *        time:
  *          type: string
  *          example: 16:00
  *        date:
  *          type: string
  *          example: 16/02/2023
  *        place:
  *          type: string
  *          example: Tòa H6 ĐHBK cơ sở 2
  *        numMembers:
  *          type: number
  *          example: 4
  *        members:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/CouncilMember'
  */