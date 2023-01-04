import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { StudentAccountStatusEnum } from "../enums/studentAccountStatus.enum";
let StudentModel = require("../models/student.model");
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.role == RoleTypeEnum.Student) {
            const existedStudent = await StudentModel.findOne({username : req.body.username});
            if (existedStudent) {
                res.status(400).send({msg: "existed username"})
            }
            else {
                const currDate: Date = new Date();
                let hashPasswod = await hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                console.log(hashPasswod);
                const body = {
                    ...req.body,
                    password: hashPasswod,
                    lastModifiedAt: currDate,
                    accountCreationDate: currDate,
                    accountStatus: StudentAccountStatusEnum.waiting
                };
                const student = new StudentModel(body);
                const user = await student.save();
                console.log(user)
                const token = sign({
                    role: RoleTypeEnum.Student,
                    _id: user._id,
                    studentId: user.studentId,
                    email: user.email,
                }, process.env.JWT_SECRET as string, {
                    expiresIn: "2h"
                })
                const result = {
                    fmName: user.fmName,
                    name: user.name,
                    token: token,
                    _id: user._id,
                    studentId: user.studentId,
                    email: user.email,
                    image: user.image
                }
                res.status(200).send({user: result})
            }
        }
        else {
            res.status(400).send({msg: "Not suitable role"})
        }
    } catch (e:any) {
        res.status(400).send({err: e})
    }
};

export default signUp;