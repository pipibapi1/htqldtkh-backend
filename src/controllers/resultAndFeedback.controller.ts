import { Request, Response, NextFunction } from "express";
const nodemailer = require("nodemailer");
import { NotificationIntf } from "../interface/notification.interface";
import dotenv from 'dotenv';
const StudentModel = require('../models/student.model');
dotenv.config();

export const resultAndFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const info = JSON.parse(req.body.info);
        if(req.file){
            const file: Express.Multer.File = req.file as Express.Multer.File;
    
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
        }
        else{
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
            }
            await transporter.sendMail(msg);
        }
        const notification: NotificationIntf = {
            author: "Hệ thống",
            subject: info.subject,
            content: "Chi tiết đã được gửi vào email đăng ký của bạn",
            createAt: (new Date()).toString(),
            redirect: "/myTopic",
            isRead: false
        }

        const student = await StudentModel.findById(info.studentId)
        let notExistStudent: boolean = false;
        if(student){
            let currentNotifications = student.notifications;
            currentNotifications = currentNotifications.concat([notification]);
            student.notifications = currentNotifications;
            student.numNotification = student.numNotification + 1;

            await student.save();
        }
        else{
            notExistStudent = true
        }
        if(notExistStudent){
            res.status(404).send({msg: 'Student not found'})
        }
        else{

            res.status(200).send({msg: "result notified successfully"})
        }
       
    } catch (error) {
        res.status(400).send({err: error})
    }
}