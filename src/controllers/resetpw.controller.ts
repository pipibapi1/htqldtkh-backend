import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
let StudentModel = require("../models/student.model");
let FacultySecretaryModel = require("../models/facultySecretary.model");
let FacultyViceDeanModel = require("../models/facultyViceDean.model");
let pwGenerator = require("generate-password");
import { hash } from "bcrypt";
const nodemailer = require("nodemailer");
import dotenv from 'dotenv';
dotenv.config();

const resetpwController = async(req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.body.role == RoleTypeEnum.Student){
            let student = await StudentModel.findOne({email: req.body.email}).lean();
            if(student){
                // 1.Generate a new random password
                const newPassword = pwGenerator.generate({
                    length: 10,
                    numbers: true
                });
                // 2. Hash the new password
                const hashNewPassword = await hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                // 3. Change the hashed password in DB
                const filter = {email: req.body.email}
                const update = {password: hashNewPassword};
                await StudentModel.findOneAndUpdate(filter,update);
                // 4. Send new password to email
                 // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: process.env.SYSTEM_EMAIL,
                        pass: process.env.SYSTEM_EMAIL_APP_PASSWORD,
                    }
                });

                // send mail with defined transport object
                const msg = {
                    from: `"HỆ THỐNG QUẢN LÝ ĐỀ TÀI KHOA HỌC CẤP SINH VIÊN" <${process.env.SYSTEM_EMAIL}>`, // sender address
                    to: req.body.email, // list of receivers
                    subject: "Bạn đã reset mật khẩu", // Subject line
                    text: "Mật khẩu mới của tài khoản của bạn là: " + newPassword, // plain text body
                }
                await transporter.sendMail(msg);

                res.status(200).send({msg: "Password reset successfully!"})
            }
            else{
                res.status(404).send({msg: "Email not found"});
            }
        }
        else if(req.body.role == RoleTypeEnum.FVD){
            let fvd = await FacultyViceDeanModel.findOne({email: req.body.email}).lean();
            if(fvd){
                // 1.Generate a new random password
                const newPassword = pwGenerator.generate({
                    length: 10,
                    numbers: true
                });
                // 2. Hash the new password
                const hashNewPassword = await hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                // 3. Change the hashed password in DB
                const filter = {email: req.body.email}
                const update = {password: hashNewPassword};
                await FacultyViceDeanModel.findOneAndUpdate(filter,update);
                // 4. Send new password to email
                 // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: process.env.SYSTEM_EMAIL,
                        pass: process.env.SYSTEM_EMAIL_APP_PASSWORD,
                    }
                });

                // send mail with defined transport object
                const msg = {
                    from: `"Hệ thống quản lý đề tài khoa học cấp sinh viên" <${process.env.SYSTEM_EMAIL}>`, // sender address
                    to: req.body.email, // list of receivers
                    subject: "Bạn đã reset mật khẩu", // Subject line
                    text: "Mật khẩu mới của tài khoản của bạn là: " + newPassword, // plain text body
                }
                const info = await transporter.sendMail(msg);

                console.log("Message sent: %s", info.messageId);
                res.status(200).send({msg: "Password reset successfully!"})
            }
            else{
                res.status(404).send({msg: "Email not found"});
            }
        }else{
            let fs = await FacultySecretaryModel.findOne({email: req.body.email}).lean();
            if(fs){
                // 1.Generate a new random password
                const newPassword = pwGenerator.generate({
                    length: 10,
                    numbers: true
                });
                // 2. Hash the new password
                const hashNewPassword = await hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUND as string));
                // 3. Change the hashed password in DB
                const filter = {email: req.body.email}
                const update = {password: hashNewPassword};
                await FacultySecretaryModel.findOneAndUpdate(filter,update);
                // 4. Send new password to email
                 // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: process.env.SYSTEM_EMAIL,
                        pass: process.env.SYSTEM_EMAIL_APP_PASSWORD,
                    }
                });

                // send mail with defined transport object
                const msg = {
                    from: `"Hệ thống quản lý đề tài khoa học cấp sinh viên" <${process.env.SYSTEM_EMAIL}>`, // sender address
                    to: req.body.email, // list of receivers
                    subject: "Bạn đã reset mật khẩu", // Subject line
                    text: "Mật khẩu mới của tài khoản của bạn là: " + newPassword, // plain text body
                }
                const info = await transporter.sendMail(msg);

                console.log("Message sent: %s", info.messageId);
                res.status(200).send({msg: "Password reset successfully!"})
            }
            else{
                res.status(404).send({msg: "Email not found"});
            }
        }
    }catch(error: any){
        res.status(400).send({err: error})
    }
}

export default resetpwController;