import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { StudentAccountStatusEnum } from "../enums/studentAccountStatus.enum";
let StudentModel = require("../models/student.model");
let FacultySecretaryModel = require("../models/facultySecretary.model");
let FacultyViceDeanModel = require("../models/facultyViceDean.model");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.role == RoleTypeEnum.Student) {
            const student = await StudentModel.findOne({username: req.body.username}).lean();
            if (student) {
                const isMatchPassword = await compare(req.body.password, student.password);
                if (isMatchPassword){
                    const token = sign({
                        role: RoleTypeEnum.Student,
                        _id: student._id,
                        studentId: student.studentId,
                        email: student.email,
                    }, process.env.JWT_SECRET as string, {
                        expiresIn: "2h"
                    })
                    delete student.username;
                    delete student.password;
                    const result = {
                        ...student,
                        token: token,
                        role: RoleTypeEnum.Student
                    }
                    res.status(200).send({user: result})
                }
                else {
                    res.status(409).send({msg: "Password not match"})
                }
            }
            else {
                res.status(404).send({msg: "Username not found"})
            }
        }
        else if (req.body.role == RoleTypeEnum.FS) {
            const secretary = await FacultySecretaryModel.findOne({username: req.body.username}).lean();
            if (secretary) {
                const isMatchPassword = await compare(req.body.password, secretary.password);
                if (isMatchPassword){
                    const token = sign({
                        role: RoleTypeEnum.FS,
                        _id: secretary._id,
                        studentId: secretary.studentId,
                        email: secretary.email,
                    }, process.env.JWT_SECRET as string, {
                        expiresIn: "2h"
                    })
                    delete secretary.username;
                    delete secretary.password;
                    const result = {
                        ...secretary,
                        token: token,
                        role: RoleTypeEnum.FS
                    }
                    res.status(200).send({user: result})
                }
                else {
                    res.status(409).send({msg: "Password not match"})
                }
            }
            else {
                res.status(404).send({msg: "Username not found"})
            }
        }
        else if (req.body.role == RoleTypeEnum.FVD) {
            const viceDean = await FacultyViceDeanModel.findOne({username: req.body.username}).lean();
            if (viceDean) {
                const isMatchPassword = await compare(req.body.password, viceDean.password);
                if (isMatchPassword){
                    const token = sign({
                        role: RoleTypeEnum.FS,
                        _id: viceDean._id,
                        studentId: viceDean.studentId,
                        email: viceDean.email,
                    }, process.env.JWT_SECRET as string, {
                        expiresIn: "2h"
                    })
                    delete viceDean.username;
                    delete viceDean.password;
                    const result = {
                        ...viceDean,
                        token: token,
                        role: RoleTypeEnum.Student
                    }
                    res.status(200).send({user: result})
                }
                else {
                    res.status(409).send({msg: "Password not match"})
                }
            }
            else {
                res.status(404).send({msg: "Username not found"})
            }
        }
    } catch (error: any) {
        res.status(400).send({err: error})
    }
}

export default signIn;