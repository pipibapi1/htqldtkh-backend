import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
let StudentModel = require("../models/student.model");
let FacultySecretaryModel = require("../models/facultySecretary.model");
let FacultyViceDeanModel = require("../models/facultyViceDean.model");
let jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

interface student {
    role:string, 
    _id: string, 
    studentId: string, 
    email: string
}

interface staff {
    role:string, 
    _id: string, 
    staffId: string, 
    email: string
}

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let author: student | staff = jwt.verify(token, process.env.JWT_SECRET as string);
            let check: boolean = false;
            if (author.role == RoleTypeEnum.Student) {
                const user = await StudentModel.findById(author._id)
                                            .select("_id studentId email")
                                            .lean();
                if ((user.studentId === (author as student).studentId) && (user.email === author.email)) {
                    check = true;
                }
            }
            else if (author.role == RoleTypeEnum.FS) {
                const user = await FacultySecretaryModel.findById(author._id)
                                            .select("_id staffId email")
                                            .lean();
                if ((user.staffId === (author as staff).staffId) && (user.email === author.email)) {
                    check = true;
                }
            }
            else if (author.role == RoleTypeEnum.FVD) {
                const user = await FacultyViceDeanModel.findById(author._id)
                                            .select("_id staffId email")
                                            .lean();
                if ((user.staffId === (author as staff).staffId) && (user.email === author.email)) {
                    check = true;
                }
            }
            if (check) {
                req.body.author = author;
                next();
            }
            else {
                res.status(403).send({msg: "Info conflict"})
            }
        }
        else {
            res.status(403).send({msg: "Token not found"})
        }
    } catch (error) {
        res.status(400).send({msg: "authorize failed"})
    }
}