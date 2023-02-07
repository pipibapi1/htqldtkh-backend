import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { staffInterface } from "../interface/staff.interface";
const StaffModel = require('../models/staff.model');

export const getAllStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const chosenFields: string[] = ["_id", "name", "gender", "phoneNumber", "email", "staffId", "birthDate"]
            const staffs: staffInterface[] = await StaffModel.find().select(chosenFields.join(" "))
                                                            .lean();

            res.status(200).send({staffs: staffs})
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}