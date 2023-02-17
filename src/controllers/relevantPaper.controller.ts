import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { unlink } from "fs";
const RelevantPaperModel = require('../models/relevantPaper.model');

export const postAddARelevantPaper = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const createAt = new Date();
            const modifiedAt = new Date();
            const info = JSON.parse(req.body.info);
            const relevantPaper = new RelevantPaperModel({
                createAt: createAt,
                modifiedAt: modifiedAt,
                paperAttachedFile: file.filename,
                paperFileType: file.mimetype,
                paperFileName: file.originalname,
                topicId: info.topicId,
                templateId: info.templateId
            });
            const result = await relevantPaper.save();
            delete result.paperAttachedFile;
            res.status(200).send({ relevantPaper: result })
        }
        else{
            if (req.file) {
                unlink(req.file.path, ()=>{});
            }
            res.status(403).send({msg: 'Not authorized'})
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateARelevantPaper = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const createAt = new Date();
            const modifiedAt = new Date();
            const info = JSON.parse(req.body.info);

            let existPaper = await RelevantPaperModel.findOne({topicId: info.topicId, templateId: info.templateId});


            if(existPaper){
                unlink('uploads/papers/' + existPaper.paperAttachedFile, ()=>{});

                existPaper.createAt = createAt;
                existPaper.modifiedAt = modifiedAt;
                existPaper.paperAttachedFile = file.filename;
                existPaper.paperFileType = file.mimetype;
                existPaper.paperFileName = file.originalname;


                const result = await existPaper.save();
                delete result.paperAttachedFile;
                res.status(200).send({ relevantPaper: result })
            }
            else{
                res.status(404).send({msg: 'Paper not found'})
            }

        }
        else{
            if (req.file) {
                unlink(req.file.path, ()=>{});
            }
            res.status(403).send({msg: 'Not authorized'})
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteRemoveAPaper = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
                let existPaper = await RelevantPaperModel.findById(req.params.paperId)
                                                        .select("_id paperAttachedFile")
                                                        .lean();
            if(existPaper){
                await RelevantPaperModel.deleteOne({_id: req.params.paperId})
                unlink('uploads/papers/' + existPaper.paperAttachedFile, ()=>{});
                res.status(200).send({msg: "Success"})
            }
            else{
                res.status(404).send({msg: 'Paper not found'})
            }
        }
        else{
            if (req.file) {
                unlink(req.file.path, ()=>{});
            }
            res.status(403).send({msg: 'Not authorized'})
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const downloadPaperAttachedFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const paperId: string = req.params.paperId;
            const paper = await RelevantPaperModel.findById(paperId)
                                                    .select("paperAttachedFile paperFileName")
                                                    .lean();
            if (paper) {
                const file: string = './uploads/papers/' + paper.paperAttachedFile;
                res.status(200).download(file, paper.paperFileName)
            }
            else {
                res.status(404).send({ msg: "Paper not found" });
            }

    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}