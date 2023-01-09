import { object, string, TypeOf, array } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    ViceDeanInput:
  *      type: object
  *      required:
  *        - email
  *        - name
  *        - fmName
  *        - gender
  *        - username
  *        - password
  *        - staffId
  *        - birthDate
  *      properties:
  *        email:
  *          type: string
  *          example: vice.dean@exa.com
  *        name:
  *          type: string
  *          example: Dean
  *        fmName:
  *          type: string
  *          example: Vice
  *        username:
  *          type: string
  *          example: vicedean
  *        password:
  *          type: string
  *          example: 12345678
  *        staffId:
  *          type: string
  *          example: 12345678
  *        gender:
  *          type: string
  *          example: Nam
  *        birthDate:
  *          type: string
  *          example: 16/02/2001
  *    ViceDeanResponse:
  *      type: object
  *      required:
  *        - _id
  *        - email
  *        - name
  *        - fmName
  *        - gender
  *        - username
  *        - password
  *        - staffId
  *        - birthDate
  *        - accountCreationDate
  *      properties:
  *        _id:
  *          type: string
  *          example: vice.dean@exa.com
  *        email:
  *          type: string
  *          example: vice.dean@exa.com
  *        name:
  *          type: string
  *          example: Dean
  *        fmName:
  *          type: string
  *          example: Vice
  *        username:
  *          type: string
  *          example: vicedean
  *        password:
  *          type: string
  *          example: 12345678
  *        staffId:
  *          type: string
  *          example: 12345678
  *        gender:
  *          type: string
  *          example: Nam
  *        birthDate:
  *          type: string
  *          example: 16/02/2001
  *        accountCreationDate:
  *          type: string
  *          example: 01/01/2023
  *    ViceDeansListResponse:
  *      type: array
  *      items:
  *        refs: '#/components/schemas/viceDeanInput'
  */

export const viceDeanSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        fmName: string({
            required_error: "First name and middle name is required",
        }),
        password: string({
            required_error: "Name is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
        studentId: string({
            required_error: "Student ID is required",
        }),
        gender: string({
            required_error: "Gender is required",
        }),
        educationType: string({
            required_error: "Education type is required",
        }),
        birthDate: string({
            required_error: "Birthday is required",
        }),
    }),
});

export type viceDean = Omit<
    TypeOf<typeof viceDeanSchema>,
    "body.password"
>;