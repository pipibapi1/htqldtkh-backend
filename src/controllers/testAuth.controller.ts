import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { hash } from "bcrypt";
import { StudentAccountStatusEnum } from "../enums/studentAccountStatus.enum";
import { regexInterface } from "../interface/general.interface";
const StudentModel = require('../models/student.model');

export const testAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (true) {
            
            const studentsList = await StudentModel.find();
            res.status(200).send({ students: studentsList});
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}

export default testAuth;