import { object, string, TypeOf, boolean, number } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    TopicCondition:
  *      type: object
  *      required:
  *        - type
  *        - createAt
  *        - expression
  *        - leaderCondition
  *        - instructionCondition
  *      properties:
  *        _id:
  *          type: string
  *          example: 1acd23
  *        type:
  *          type: string
  *          example: chính quy
  *        createAt:
  *          type: string
  *          example: 01/01/2023
  *        expression:
  *          type: object
  *        leaderCondition:
  *          type: array
  *          items: 
  *            type: string
  *        instructionCondition:
  *          type: object
  */