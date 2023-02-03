import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { periodInterface } from "../interface/period.interface";
const PeriodModel = require("../models/period.model");

export const getAllPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            const chosenFields: string[] = ["_id", "period", "status", "createAt"]
            const periods: periodInterface[] = await PeriodModel.select(chosenFields.join(""))
                                                                                .lean();

            res.status(200).send({periods: periods})
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}
