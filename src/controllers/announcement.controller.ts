import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
const AnnouncementModel = require('../models/annoucement.model');
import { unlink } from "fs";

export const postAddAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const createAt = new Date();
            const info = JSON.parse(req.body.info);
            const announcement = new AnnouncementModel({
                title: info.title,
                content: info.content,
                createAt: createAt,
                attachedFile: file.filename,
                fileType: file.mimetype,
                fileName: file.originalname
            });
            const result = await announcement.save();
            delete result.attachedFile;
            res.status(200).send({ announcement: result })
        }
        else {
            if (req.file) {
                unlink(req.file.path, ()=>{});
            }
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        if (req.file) {
            unlink(req.file.path, ()=>{});
        }
        res.status(400).send({err: error})
    }
}

export const getListAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let pageNum: number = 1;
        let limit: number = 5;
        if (req.query.page) pageNum = parseInt(req.query.page as string);
        if (req.query.limit) limit = parseInt(req.query.limit as string);
        const start: number = limit * (pageNum - 1);
        const end: number = limit * pageNum;
        const announcementsList = await AnnouncementModel.find({})
                                        .select("_id title content createAt fileType fileName")
                                        .limit(end)
                                        .lean()
                                        .sort({createAt: -1});
        if (end <= 0 || start >= announcementsList.length) {
            res.status(200).send({ announcements: [] });
        }
        else {
            const chosenAnnouncements = announcementsList.slice(start, end);
            res.status(200).send({ announcements: chosenAnnouncements });
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAnnouncementDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const announcementId: string = req.params.announcementId;
        const announcement = await AnnouncementModel.findById(announcementId).lean();
        if (announcement) {
            delete announcement.attachedFile;
            res.status(200).send({ announcement: announcement });
        }
        else {
            res.status(404).send({ msg: "Announcement not found" });
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAnnouncementAttachedFileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const announcementId: string = req.params.announcementId;
        const announcement = await AnnouncementModel.findById(announcementId)
                                                    .select("attachedFile")
                                                    .lean();
        if (announcement) {
            const file: string = announcement.attachedFile;
            delete announcement.attachedFile;
            res.status(200).sendFile(file , {root: "uploads/announcements/"});
        }
        else {
            res.status(404).send({ msg: "Announcement not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}

export const downloadAnnouncementAttachedFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const announcementId: string = req.params.announcementId;
        const announcement = await AnnouncementModel.findById(announcementId)
                                                    .select("attachedFile fileName")
                                                    .lean();
        if (announcement) {
            const file: string = './uploads/announcements/' + announcement.attachedFile;
            res.status(200).download(file, announcement.fileName)
        }
        else {
            res.status(404).send({ msg: "Announcement not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}