import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { instructorInterface } from "../interface/instructorInterface";

const InstructorModel = require('../models/instructor.model');

export const getAllInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || author.role == RoleTypeEnum.Student) {
            const chosenFields: string[] = ["_id", "name", "gender", "phoneNumber", "email", "staffId", "birthDate", "academyRank", "degree"]
            const instructors: instructorInterface[] = await InstructorModel.find().select(chosenFields.join(" "))
                                                            .lean();

            res.status(200).send({instructors: instructors})
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}