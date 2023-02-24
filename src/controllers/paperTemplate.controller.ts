import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { regexInterface } from "../interface/general.interface";
import { templateInterface } from "../interface/template.interface";
import { unlink } from "fs";
const PaperTemplateModel = require('../models/paperTemplate.model');
const RelevantPaperModel = require('../models/relevantPaper.model');
const FormModel = require('../models/form.model');

export const postAddAPaperTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file: Express.Multer.File = req.file as Express.Multer.File;
        const createAt = new Date();
        const info = JSON.parse(req.body.info);
        const paperTemplate = new PaperTemplateModel({
            templateGivenId: info.templateGivenId,
            name: info.name,
            forStudent: info.forStudent,
            createAt: createAt,
            templateAttachedFile: file.filename,
            templateFileType: file.mimetype,
            templateFileName: file.originalname,
            formId: "",
            inUse: true
        });
        const result = await paperTemplate.save();
        delete result.templateAttachedFile;
        res.status(200).send({ paperTemplate: result })
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAllPaperTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            (author.role == RoleTypeEnum.Student && req.query.forStudent == 'true')) 
            {
            let filter: {[k: string]: regexInterface | string} = {};
            if(req.query.forStudent){
                filter.forStudent = req.query.forStudent as string
            }
            const chosenField: string[] = ["_id", "templateGivenId", "name", "forStudent", "createAt", "formId", "inUse"];
            const templates : templateInterface[] = await PaperTemplateModel.find(filter)
                                                                                       .select(chosenField.join(" "))
                                                                                       .lean();
            res.status(200).send({templates: templates});
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAllPaperTemplateWithPaper = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        const topicId: string = req.params.topicId;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            (author.role == RoleTypeEnum.Student && req.query.forStudent == 'true')) 
            {
            let filter: {[k: string]: regexInterface | string} = {};
            if(req.query.forStudent){
                filter.forStudent = req.query.forStudent as string
            }
            if(req.query.inUse){
                filter.inUse = req.query.inUse as string
            }
            const chosenField: string[] = ["_id", "templateGivenId", "name"];
            const templates : {_id?: string, templateGivenId: string, name: string}[] = await PaperTemplateModel.find(filter)
                                                                                       .select(chosenField.join(" "))
                                                                                       .lean();
            let templatesWithPapers : {_id?: string, name: string, paper: {_id?: string, paperFileName: string} | undefined}[] = []
            for(let i = 0; i < templates.length; ++i){
                const template = templates[i]
                const chosenField: string[] = ["_id", "paperFileName"];
                const paper: {_id?: string, paperFileName: string} | undefined = await RelevantPaperModel.findOne({templateId: template._id, topicId: topicId})
                                                                                            .select(chosenField.join(" "))
                                                                                            .lean();
                const templateWithPaper : {_id?: string, templateGivenId: string, name: string, paper: {_id?: string, paperFileName: string} | undefined} = {
                    _id: template._id,
                    templateGivenId: template.templateGivenId,
                    name: template.name,
                    paper: paper
                }
                templatesWithPapers = templatesWithPapers.concat([templateWithPaper]);
            }                                                                           
            res.status(200).send({templatesWithPapers: templatesWithPapers});
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateATemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
                let existTemplate = await PaperTemplateModel.findById(req.params.templateId)
                                                        .select("_id")
                                                        .lean();
            if(existTemplate){
                const update = req.body.template;
                const updatedTemplate = await PaperTemplateModel.findOneAndUpdate({_id: req.params.templateId}, update, 
                    {new : true});
                res.status(200).send({template : updatedTemplate})
            }
            else{
                res.status(404).send({msg: 'Template not found'})
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
export const deleteRemoveATemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
                let existTemplate = await PaperTemplateModel.findById(req.params.templateId)
                                                        .select("_id templateAttachedFile formId")
                                                        .lean();
            if(existTemplate){
                const paperList = await RelevantPaperModel.find({templateId: req.params.templateId})
                                                          .select("_id")
                                                          .lean();
                if(paperList.length === 0){
                    await PaperTemplateModel.deleteOne({_id: req.params.templateId})
                    unlink('uploads/templates/' + existTemplate.templateAttachedFile, ()=>{});
                    if(existTemplate.formId !== ""){
                        await FormModel.deleteOne({_id: existTemplate.formId})
                    }
                    res.status(200).send({msg: "Success"})
                }
                else
                {
                    res.status(409).send({msg: 'Exist relevant paper'})
                }
            }
            else{
                res.status(404).send({msg: 'Template not found'})
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

export const downloadTemplateAttachedFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const templateId: string = req.params.templateId;
        const template = await PaperTemplateModel.findById(templateId)
                                                    .select("templateAttachedFile templateFileName")
                                                    .lean();
        if (template) {
            const file: string = './uploads/templates/' + template.templateAttachedFile;
            res.status(200).download(file, template.templateFileName)
        }
        else {
            res.status(404).send({ msg: "Template not found" });
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}