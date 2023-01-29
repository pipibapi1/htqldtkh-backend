import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum} from "../enums/roleType.enum";
import { expenseInterface, allocatedExpenseForType, usedExpenseForType, 
    updateExpenseInterface } from "../interface/expense.interface";
import { regexInterface } from "../interface/general.interface";
import { topicExpenseInterface } from "../interface/topic.interface";
const AllocatedExpenseModel = require('../models/allocatedExpense.model');
const TopicModel = require('../models/topic.model')

export const postAllocatedExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const expenseInfo: expenseInterface = req.body.expense;
            const lastModified: string = (new Date()).toString();
            const allocatedExpense = new AllocatedExpenseModel({
                ...expenseInfo,
                lastModified: lastModified,
                createAt: lastModified
            });
            const result = await allocatedExpense.save();
            res.status(200).send({expense: result})
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAllocatedExpenseList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            let pageNum: number = 1;
            let limit: number = 10;
            let filter: {period?: regexInterface} = {};
            if (req.query.page) pageNum = parseInt(req.query.page as string);
            if (req.query.limit) limit = parseInt(req.query.limit as string);
            if (req.query.period) {
                filter.period = {$regex: req.query.period as string, $options: 'i'}
            }
            const start: number = limit * (pageNum - 1);
            const end: number = limit * pageNum;
            const allocatedExpenseList: expenseInterface[] = await AllocatedExpenseModel.find(filter)
                                                                .limit(end)
                                                                .sort({createAt: -1})
                                                                .select("_id lastModified createAt period")
                                                                .lean();
            if (end <= 0 || start >= allocatedExpenseList.length) {
                res.status(200).send({ expenses: [] });
            }
            else {
                const chosenExpenses = allocatedExpenseList.slice(start, end);
                res.status(200).send({ expenses: chosenExpenses });
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAllocatedExpenseDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            const allocatedExpense: expenseInterface = await AllocatedExpenseModel.findById(req.params.expenseId)
                                                            .lean();
            if (allocatedExpense) {
                allocatedExpense.usedExpense = 0;
                allocatedExpense.used = {};
                const period = allocatedExpense.period;
                const topicExpense: topicExpenseInterface[] = await TopicModel.find({period: period})
                                                                .select("type expense")
                                                                .lean();
                for (let index: number = 0; index < topicExpense.length; index++) {
                    const currTopic: topicExpenseInterface = topicExpense[index];
                    allocatedExpense.usedExpense += currTopic.expense;
                    if (allocatedExpense.used[currTopic.type]){
                        allocatedExpense.used[currTopic.type] += currTopic.expense;
                    }
                    else {
                        allocatedExpense.used[currTopic.type] = currTopic.expense;
                    }
                }
                res.status(200).send({expense: allocatedExpense})
            }
            else {
                res.status(404).send({msg: "Not found"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteAllocatedExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const existedExpense = await AllocatedExpenseModel.findById(req.params.expenseId).lean();
            if (existedExpense) {
                await AllocatedExpenseModel.deleteOne({_id : req.params.expenseId});
                res.status(200).send({msg: "Success"})
            }
            else {
                res.status(404).send({msg: "Expense Not found"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateAllocatedExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const allocatedExpense = await AllocatedExpenseModel.findById(req.params.expenseId);
            if (allocatedExpense) {
                const update: updateExpenseInterface = {};
                if (req.body.expense.totalExpense) {
                    update.totalExpense = parseInt(req.body.expense.totalExpense);
                }
                if (req.body.expense.generalExpense) {
                    update.generalExpense = parseInt(req.body.expense.generalExpense);
                }
                if ((req.body.expense.allocated as allocatedExpenseForType[]).length >= 0) {
                    update.allocated = req.body.expense.allocated;
                }
                if (req.body.expense.note) {
                    update.note = req.body.expense.note;
                }
                update.lastModified = (new Date()).toString();
                const updatedExpense: expenseInterface = await AllocatedExpenseModel.findOneAndUpdate({_id: req.params.expenseId}, update)
                res.status(200).send({expense: updatedExpense})
            }
            else {
                res.status(404).send({msg: "expense not found"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}