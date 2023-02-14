import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { regexInterface } from "../interface/general.interface";
const PaperTemplateModel = require('../models/paperTemplate.model');

export const postAddAPaperTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file: Express.Multer.File = req.file as Express.Multer.File;
        const createAt = new Date();
        const info = JSON.parse(req.body.info);
        const paperTemplate = new PaperTemplateModel({
            name: info.name,
            forStudent: info.forStudent,
            createAt: createAt,
            templateAttachedFile: file.filename,
            templateFileType: file.mimetype,
            templateFileName: file.originalname,
            formId: ""
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
            const chosenField: string[] = ["_id", "name"];
            const templates : {_id?: string, name: string}[] = await PaperTemplateModel.find(filter)
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
        console.log(error)
        res.status(400).send({err: error})
    }
}