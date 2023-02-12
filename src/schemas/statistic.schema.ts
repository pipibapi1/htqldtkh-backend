/**
  * @openapi
  * components:
  *  schemas:
  *    TimeRangeInput:
  *      type: object
  *      required:
  *        - startYear
  *        - endYear
  *      properties:
  *        startYear:
  *          type: Date
  *          example: 2022-03-01T16:00:00.000+00:00
  *        endYear:
  *          type: Date
  *          example: 2022-09-01T16:00:00.000+00:00
  *    PeriodExpenseResponse:
  *      type: object
  *      required:
  *        - _id
  *        - period
  *        - usedExpense
  *      properties:
  *        _id:
  *          type: string
  *          example: 63dc7e294422fef5552cac28
  *        period:
  *          type: string
  *          example: 2022-03-01T16:00:00.000+00:00
  *        usedExpense:
  *          type: number
  *          example: 100000000
  *    PeriodExpenseListResponse:
  *      type: array
  *      items:
  *        $ref: '#/components/schemas/PeriodExpenseResponse'
  */