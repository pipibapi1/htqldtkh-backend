import { object, string, TypeOf, number } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    AllocatedExpenseInput:
  *      type: object
  *      required:
  *        - period
  *        - allocated
  *        - totalExpense
  *      properties:
  *        period:
  *          type: string
  *          example: HK202
  *        allocated:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/ExpenseForType'
  *        totalExpense:
  *          type: number
  *          example: 50000000
  *        generalExpense:
  *          type: number
  *          example: 1000000
  *        note:
  *          type: string
  *          example: Ghi chu
  *    ExpenseForType:
  *      type: object
  *      properties:
  *        type:
  *          type: string
  *          example: Chính quy
  *        totalExpense:
  *          type: number
  *          example: 25000000
  *        maxExpensePerTopic:
  *          type: number
  *          example: 5000000
  *    AllocatedExpenseResponse:
  *      type: object
  *      required:
  *        - period
  *        - lastModified
  *        - createAt
  *        - allocated
  *        - totalExpense
  *        - generalExpense
  *        - note
  *        - used
  *        - usedExpense
  *      properties:
  *        period:
  *          type: string
  *          example: HK202
  *        lastModified:
  *          type: string
  *          example: 16/01/2023
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        allocated:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/ExpenseForType'
  *        totalExpense:
  *          type: number
  *          example: 50000000
  *        generalExpense:
  *          type: number
  *          example: 1000000
  *        note:
  *          type: string
  *          example: Ghi chu
  *        used:
  *          type: object
  *        usedExpense:
  *          type: number
  *          example: 7500000
  *    ExpenseGeneralInfo:
  *      type: object
  *      required:
  *        - period
  *        - lastModified
  *        - createAt
  *        - _id
  *      properties:
  *        period:
  *          type: string
  *          example: HK202
  *        lastModified:
  *          type: string
  *          example: 16/01/2023
  *        createAt:
  *          type: string
  *          example: 16/01/2023
  *        _id:
  *          type: string
  *          example: 11111adc11
  *    UpdateAllocatedExpenseInput:
  *      type: object
  *      required:
  *      properties:
  *        allocated:
  *          type: array
  *          items:
  *            $ref: '#/components/schemas/ExpenseForType'
  *        totalExpense:
  *          type: number
  *          example: 50000000
  *        generalExpense:
  *          type: number
  *          example: 1000000
  *        note:
  *          type: string
  *          example: Ghi chu
  */