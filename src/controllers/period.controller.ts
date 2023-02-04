import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { periodInterface } from "../interface/period.interface";
import { PeriodStatusEnum } from "../enums/periodStatus.enum";
const PeriodModel = require("../models/period.model");

export const getAllPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            const chosenFields: string[] = ["_id", "period", "status", "createAt"]
            const periods: periodInterface[] = await PeriodModel.find().select(chosenFields.join(" "))
                                                                        .lean()
                                                                        .sort({period: -1});
                                                                        ;
            res.status(200).send({periods: periods})
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}

export const postAddAPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const currDate: Date = new Date();
            const info = {
                ...req.body.period,
                status: PeriodStatusEnum.OPEN,
                createAt: currDate
            }
            const newPeriod = new PeriodModel(info);
            const result = await newPeriod.save();
            res.status(200).send({period: result});
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}
