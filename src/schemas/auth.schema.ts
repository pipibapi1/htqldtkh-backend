import { object, string, TypeOf } from "zod";
/**
  * @openapi
  * components:
  *  schemas:
  *    SignUpInput:
  *      type: object
  *      required:
  *        - email
  *        - name
  *        - fmName
  *        - gender
  *        - username
  *        - password
  *        - studentId
  *        - educationType
  *        - birthDate
  *        - role
  *      properties:
  *        email:
  *          type: string
  *          example: jane.doe@exa.com
  *        name:
  *          type: string
  *          example: Jane Doe
  *        fmName:
  *          type: string
  *          example: Jane Doe
  *        username:
  *          type: string
  *          example: mduypham
  *        password:
  *          type: string
  *          example: 12345678
  *        studentId:
  *          type: string
  *          example: 1912916
  *        gender:
  *          type: string
  *          example: Nam
  *        educationType:
  *          type: string
  *          example: chính quy
  *        birthDate:
  *          type: string
  *          example: 16/02/2001
  *        role:
  *          type: string
  *          example: sinh viên
  *    SignInInput:
  *      type: object
  *      required:
  *        - username
  *        - password
  *        - role
  *      properties:
  *        username:
  *          type: string
  *          example: mduypham
  *        password:
  *          type: string
  *          example: 12345678
  *        role:
  *          type: string
  *          example: sinh viên
  *    AuthResponse:
  *      type: object
  *      properties:
  *        email:
  *          type: string
  *        name:
  *          type: string
  *        fmName:
  *          type: string
  *        token:
  *          type: string
  *        _id:
  *          type: string
  *        image:
  *          type: string
  *        studentId:
  *          type: string
  *    ResetPwInput:
  *      type: object
  *      properties:
  *        email:
  *          type: string
  *        role:
  *          type: string
  */

export const SignUpSchema = object({
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

export type SignUpInput = Omit<
    TypeOf<typeof SignUpSchema>,
    "body.password"
>;