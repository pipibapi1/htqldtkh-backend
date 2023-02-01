import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { hash } from "bcrypt";
import { regexInterface } from "../interface/general.interface";
const FacultySecretaryModel = require('../models/facultySecretary.model')

export const getAllFacultySecretary = async (req: Request, res: Response, next: NextFunction) => {
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
            const secretarysList = await FacultySecretaryModel.find(filter)
                                            .select("name gender phoneNumber email staffId username password accountCreationDate")
                                            .limit(end)
                                            .lean()
                                            .sort({accountCreationDate: -1});
            if (end <= 0 || start >= secretarysList.length) {
                res.status(200).send({ secretarys: [] });
            } 
            else {
                const chosenSecretarys = secretarysList.slice(start, end);
                res.status(200).send({ secretarys: chosenSecretarys });
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getFacultySecretaryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const secretary = await FacultySecretaryModel.findById(req.params._id)
                                                .lean();
            if (secretary) {
                res.status(200).send({ secretary: secretary })
            }
            else res.status(404).send({ msg: 'Secretary not found' })
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const postAddFacultySecretary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const currentTime: Date = new Date();
            const existedSecretary = await FacultySecretaryModel.findOne({username: req.body.secretary.username});
            if (existedSecretary) {
                res.status(400).send({err: "Username existed"})
            }
            else {
                let hashPassword = await hash(req.body.secretary.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                const newSecretary = new FacultySecretaryModel({
                    ...req.body.secretary,
                    password: hashPassword,
                    accountCreationDate: currentTime
                });
                const result = await newSecretary.save();
                res.status(200).send({secretary: result})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error: any) {
        res.status(400).send({err: error})
    }
}

export const putUpdateAFacultySecretary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const secretary = await FacultySecretaryModel.findById(req.params._id);
            if (secretary) {
                const changeableField: string[] = ['name', 'gender', 'email', 'phoneNumber',
                                            'username', 'password', 'image', 'staffId', 'birthDate']
                for (let field in changeableField){
                    if (req.body.secretary[changeableField[field]]) {
                        if (changeableField[field] == 'password') {
                            let hashPassword = await hash(req.body.secretary.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                            secretary.password = hashPassword
                        }
                        else {
                            secretary[changeableField[field]] = req.body.secretary[changeableField[field]]
                        }
                    }
                }
                const currentSecretary = await secretary.save();
                res.status(200).send({secretary: currentSecretary})
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

export const deleteRemoveAFacultySecretary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            if (req.params._id != author._id) {
                const existedSecretary = await FacultySecretaryModel.findById(req.params._id);
                if (existedSecretary) {
                    await FacultySecretaryModel.deleteOne({_id: req.params._id})
                    res.status(200).send({msg: "Success"})
                }
                else {
                    res.status(400).send({err: "Account not existed"})
                }
            }
            else {
                res.status(409).send({msg: "Your authorization cannot delete this account"})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}