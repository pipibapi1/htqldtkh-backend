import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { hash } from "bcrypt";
import { regexInterface } from "../interface/general.interface";
const FacultyViceDeanModel = require('../models/facultyViceDean.model');
import dotenv from 'dotenv';
dotenv.config();

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
            let filter: {[k: string]: regexInterface} = {};
            const filterFields: string[] = ["name", "email", "phoneNumber", "staffId"]
            filterFields.forEach((field) => {
                if (req.query[field]) {
                    filter[field] = {$regex: req.query[field] as string,
                                        $options: 'i'}
                }
            })
            const fullList = await FacultyViceDeanModel.find(filter)
                                                    .select("_id");
            const totalPage = fullList.length % limit === 0 ? (fullList.length / limit) : (Math.floor(fullList.length / limit) + 1);
            const viceDeansList = await FacultyViceDeanModel.find(filter)
                                            .select("name gender phoneNumber email staffId username password accountCreationDate birthDate rawPassword")
                                            .limit(end)
                                            .lean()
                                            .sort({accountCreationDate: -1});
            if (end <= 0 || start >= viceDeansList.length) {
                res.status(200).send({ viceDeans: [], metadata:{totalPage: totalPage} });
            } 
            else {
                const chosenViceDeans = viceDeansList.slice(start, end);
                res.status(200).send({ viceDeans: chosenViceDeans, metadata:{totalPage: totalPage} });
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
        if (author.role == RoleTypeEnum.FS || (author.role == RoleTypeEnum.FVD && author._id == req.params._id)) {
            const viceDean = await FacultyViceDeanModel.findById(req.params._id)
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
            const existedViceDean = await FacultyViceDeanModel.findOne({username: req.body.viceDean.username});
            const existedViceDeanEmail = await FacultyViceDeanModel.findOne({email: req.body.viceDean.email});
            if (existedViceDean || existedViceDeanEmail) {
                if(existedViceDean){
                    res.status(400).send({err: "Username existed"})
                }
                if(existedViceDeanEmail){
                    res.status(400).send({err: "Email existed"})
                }
            }
            else {
                let hashPassword = await hash(req.body.viceDean.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                const newViceDean = new FacultyViceDeanModel({
                    ...req.body.viceDean,
                    password: hashPassword,
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
        if (author.role == RoleTypeEnum.FS || (author.role == RoleTypeEnum.FVD && (author._id == req.params._id))) 
        {
            const viceDean = await FacultyViceDeanModel.findById(req.params._id);
            if (viceDean) {
                const changeableField: string[] = ['name', 'gender', 'email', 'phoneNumber',
                                            'username', 'password', 'image', 'staffId', 'birthDate', 'rawPassword']
                for (let field in changeableField){
                    if (req.body.viceDean[changeableField[field]]) {
                        if (changeableField[field] == 'password') {
                            let hashPassword = await hash(req.body.viceDean.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                            viceDean.password = hashPassword
                        }
                        else {
                            viceDean[changeableField[field]] = req.body.viceDean[changeableField[field]]
                        }
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
            const existedViceDean = await FacultyViceDeanModel.findById(req.params._id).lean();
            if (existedViceDean) {
                await FacultyViceDeanModel.deleteOne({_id: req.params._id})
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