import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
const FacultyViceDeanModel = require('../models/facultyViceDean.model');

export const getAllFacultyViceDean = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            let pageNum: number = 1;
            let limit: number = 10;
            if (req.query.page) pageNum = parseInt(req.query.page as string);
            if (req.query.limit) limit = parseInt(req.query.limit as string);
            const start: number = limit * (pageNum - 1);
            const end: number = limit * pageNum;
            const viceDeansList = await FacultyViceDeanModel.find({})
                                            .limit(end)
                                            .lean()
                                            .sort({accountCreationDate: -1});
            if (end <= 0 || start >= viceDeansList.length) {
                res.status(200).send({ viceDeans: [] });
            } 
            else {
                const chosenViceDeans = viceDeansList.slice(start, end);
                res.status(200).send({ viceDeans: chosenViceDeans });
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getFacultyViceDeanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const viceDean = await FacultyViceDeanModel.findById(req.params.viceDeanId)
                                                .lean();
            if (viceDean) {
                res.status(200).send({ viceDean: viceDean })
            }
            else res.status(404).send({ msg: 'Vice Dean not found' })
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const postAddFacultyViceDean = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const currentTime: Date = new Date();
            const existedViceDean = await FacultyViceDeanModel.findOne({username: req.body.username}).lean();
            if (existedViceDean) {
                res.status(400).send({err: "Username existed"})
            }
            else {
                const newViceDean = new FacultyViceDeanModel({
                    ...req.body.viceDean,
                    accountCreationDate: currentTime
                });
                const result = await newViceDean.save();
                res.status(200).send({viceDean: result})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error: any) {
        res.status(400).send({err: error})
    }
}

export const putUpdateAFacultyViceDean = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const existedViceDean = await FacultyViceDeanModel.findById(req.params.viceDeanId).lean();
            if (existedViceDean) {
                const changableField: string[] = ['fmName', 'name', 'gender', 'email', 'phoneNumber',
                                            'username', 'password', 'image', 'staffId', 'birthDate']
                let viceDean = await FacultyViceDeanModel.findOne({_id: req.params.viceDeanId});
                for (let field in changableField){
                    if (req.body.viceDean[changableField[field]]) {
                        viceDean[changableField[field]] = req.body.viceDean[changableField[field]]
                    }
                }
                const currentViceDean = await viceDean.save();
                res.status(200).send({viceDean: currentViceDean})
            }
            else {
                res.status(400).send({err: "Account not existed"})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteRemoveAFacultyViceDean = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const existedViceDean = await FacultyViceDeanModel.findById(req.params.viceDeanId).lean();
            if (existedViceDean) {
                await FacultyViceDeanModel.deleteOne({_id: req.params.viceDeanId})
                res.status(200).send({msg: "Success"})
            }
            else {
                res.status(400).send({err: "Account not existed"})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}