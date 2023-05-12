import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { periodInterface } from "../interface/period.interface";
import { PeriodStatusEnum } from "../enums/periodStatus.enum";
const PeriodModel = require("../models/period.model");
const AllocatedExpenseModel = require('../models/allocatedExpense.model');
import { regexInterface } from "../interface/general.interface";

export const getAllPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let filter: {[k: string]: regexInterface | string} = {};
        if(req.query.year){
            filter.year = req.query.year as string
        }
        if(req.query.status){
            filter.status = req.query.status as string
        }
        const chosenFields: string[] = ["_id", "period", "status", "createAt", "title", "year"]
        const periods: periodInterface[] = await PeriodModel.find(filter).select(chosenFields.join(" "))
                                                                        .lean()
                                                                        .sort({period: -1});
                                                                        ;
        res.status(200).send({periods: periods})
    } catch (error) {
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
            const result1 = await newPeriod.save()
                .then(async (period: periodInterface) => {
                    const lastModified: string = (new Date()).toString();
                    const allocatedExpense = new AllocatedExpenseModel({
                        period: period._id,
                        lastModified: lastModified,
                        createAt: lastModified,
                        allocated: [],
                        totalExpense: 0,
                        generalExpense:0,
                        usedExpense: 0,
                        note: ""
                    });
                    const result2 = await allocatedExpense.save();
                    return period;
                }
                )
                .catch((err: any) => {
                    console.log(err)
                });
            res.status(200).send({period: result1});
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}

export const putUpdateAPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const period = await PeriodModel.findById(req.params._id);
            if (period) {
                const changeableFields: string[] = ['status'];
                for (let field in changeableFields) {
                    if (req.body.period[changeableFields[field]]){
                        period[changeableFields[field]] = req.body.period[changeableFields[field]]
                    }
                }
                const currentPeriod: {[k: string]: string} = await period.save();
                res.status(200).send({period: currentPeriod})        
            }
            else {
                res.status(404).send({msg: 'Period not found'})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}
