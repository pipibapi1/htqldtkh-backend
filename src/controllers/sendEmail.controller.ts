import { Request, Response, NextFunction } from "express";
const nodemailer = require("nodemailer");
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.file){
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const info = JSON.parse(req.body.info);
    
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: process.env.SYSTEM_EMAIL,
                    pass: process.env.SYSTEM_EMAIL_APP_PASSWORD,
                }
            });
    
            const msg = {
                from: `"HỆ THỐNG QUẢN LÝ ĐỀ TÀI KHOA HỌC CẤP SINH VIÊN" <${process.env.SYSTEM_EMAIL}>`,
                to: info.email,
                subject: info.subject,
                text: info.text,
                attachments: [{
                    filename: file.originalname,
                    content: file.buffer
                }]
            }
            await transporter.sendMail(msg);
    
            res.status(200).send({msg: "Send email successfully"})
        }
        else{
            const info = JSON.parse(req.body.info);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: process.env.SYSTEM_EMAIL,
                    pass: process.env.SYSTEM_EMAIL_APP_PASSWORD,
                }
            });
    
            const msg = {
                from: `"Hệ thống quản lý đề tài khoa học cấp sinh viên" <${process.env.SYSTEM_EMAIL}>`,
                to: info.email,
                subject: info.subject,
                text: info.text,
            }
            await transporter.sendMail(msg);
            res.status(200).send({msg: "Send email successfully"})
        }
       
    } catch (error) {
        res.status(400).send({err: error})
    }
}