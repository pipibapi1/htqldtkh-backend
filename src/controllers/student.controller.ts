import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { hash } from "bcrypt";
import { StudentAccountStatusEnum } from "../enums/studentAccountStatus.enum";
import { regexInterface } from "../interface/general.interface";
const StudentModel = require('../models/student.model');
import dotenv from 'dotenv';
dotenv.config();

export const getListStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            let pageNum: number = 1;
            let limit: number = 10;
            if (req.query.page) pageNum = parseInt(req.query.page as string);
            if (req.query.limit) limit = parseInt(req.query.limit as string);
            const start: number = limit * (pageNum - 1);
            const end: number = limit * pageNum;
            let filter: {[k: string]: regexInterface | string} = {};
            const filterFields: string[] = ["name", "status", "email", "phoneNumber", "studentId", "eduType"]
            filterFields.forEach((field) => {
                if (req.query[field]) {
                    if (field == "name") {
                        filter.name = {$regex: req.query.name as string,
                                            $options: 'i'}
                    }
                    else if (field == "status") {
                        filter.accountStatus = {$regex: req.query.status as string,
                                            $options: 'i'}
                    }
                    else if (field == "eduType") {
                        filter.educationType = req.query.eduType as string;
                    }
                    else {
                        filter[field] = {$regex: req.query[field] as string,
                                            $options: 'i'}
                    }
                }
            })
            const fullList = await StudentModel.find(filter)
                                        .select("_id");
            const totalPage = fullList.length % limit === 0 ? (fullList.length / limit) : (Math.floor(fullList.length / limit) + 1);
            const studentsList = await StudentModel.find(filter)
                                            .select("_id name gender phoneNumber email studentId username birthDate password accountStatus accountCreationDate")
                                            .limit(end)
                                            .lean()
                                            .sort({accountCreationDate: -1});
            if (end <= 0 || start >= studentsList.length) {
                res.status(200).send({ students: [], metadata:{totalPage: totalPage}  });
            }
            else {
                const chosenStudents = studentsList.slice(start, end);
                res.status(200).send({ students: chosenStudents, metadata:{totalPage: totalPage}  });
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id: string = req.params._id;
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD 
            || (author.role == RoleTypeEnum.Student && author._id == req.params._id)) 
        {
            const studentInfo = await StudentModel.findById(_id).lean();
            if (studentInfo) {
                res.status(200).send({student: studentInfo});
            }
            else {
                res.status(404).send({msg: "Student not found"});
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const postAddAStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const existedStudent = await StudentModel.findOne({username: req.body.student.username}).lean();
            if  (existedStudent) {
                res.status(400).send({msg: "existed username"})
            }
            else {
                const currDate: Date = new Date();
                let hashPassword = await hash(req.body.student.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                const info = {
                    ...req.body.student,
                    role: RoleTypeEnum.Student,
                    password: hashPassword,
                    lastModifiedAt: currDate,
                    accountCreationDate: currDate,
                    accountStatus: StudentAccountStatusEnum.approved
                };
                const newStudent = new StudentModel(info);
                const result = await newStudent.save();
                res.status(200).send({student: result});
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

export const putUpdateAStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || (author.role == RoleTypeEnum.Student && author._id == req.params._id)) {
            const student = await StudentModel.findById(req.params._id);
            if (student) {
                const changeableFields: string[] = ['name', 'gender', 'phoneNumber', 'email', 'username',
                                            'password', 'image', 'studentId', 'educationType', 
                                            'accountStatus', 'birthDate', "numNotification"];
                for (let field in changeableFields) {
                    if (req.body.student[changeableFields[field]] !== undefined){
                        if (changeableFields[field] == 'password') {
                            let hashPassword = await hash(req.body.student.password, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                            student.password = hashPassword;
                        }
                        else student[changeableFields[field]] = req.body.student[changeableFields[field]]
                    }
                }
                const currentStudent: {[k: string]: string} = await student.save();
                res.status(200).send({student: currentStudent})        
            }
            else {
                res.status(404).send({msg: 'Student not found'})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteAStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const existedStudent = await StudentModel.findById(req.params._id);
            if (existedStudent) {
                await StudentModel.deleteOne({_id: req.params._id})
                res.status(200).send({msg: "Success"})
            }
            else {
                res.status(404).send({msg: 'student not found'});
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}