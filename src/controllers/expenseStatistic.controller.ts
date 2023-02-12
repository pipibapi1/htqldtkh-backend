import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { expenseInterface } from "../interface/expense.interface";
const PeriodModel = require("../models/period.model");
const AllocatedExpenseModel = require('../models/allocatedExpense.model');

export const getUsedExpenseByPeriodWithTimeRange = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            const startYear = new Date(req.params.startYear)
            const endYear = new Date(req.params.endYear)
            const periodList: {_id: string, period: string}[] = await PeriodModel.find({
                                                                            $and: [
                                                                                {period: {$gte: startYear}},
                                                                                {period: {$lte: endYear}}
                                                                            ]
                                                                        })
                                                                            .select("_id period")
                                                                            .lean()
                                                                            .sort({period: 1});
            let periodListWithUsedExpense : {_id: string, period: string, usedExpense: number|undefined}[] = [];
            let check: boolean = true;
            for (let index: number = 0; (check && index < periodList.length); index++) {
                    let period = periodList[index]
                    const allocatdExpense: expenseInterface = await AllocatedExpenseModel.findOne({period: period._id});
                    if(allocatdExpense){
                        const usedExpense = allocatdExpense.usedExpense;
                        periodListWithUsedExpense = periodListWithUsedExpense.concat([{_id: period._id, period: period.period, usedExpense: usedExpense}])
                    }
                    else{
                        check = false
                        res.status(404).send({msg: "Expense not found"})
                    }
            }
            if (check) {
                res.status(200).send({periodListWithUsedExpense: periodListWithUsedExpense});
            }
            else {
                res.status(404).send({msg: "some student not found"})
            }
            
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}