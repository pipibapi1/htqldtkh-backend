import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { unlink } from "fs";
import { formInterface } from "../interface/form.interface";
const PaperTemplateModel = require('../models/paperTemplate.model');
const FormModel = require('../models/form.model');

export const postAddAForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const createAt = new Date();
            const info = JSON.parse(req.body.info);

            const existedTemplate = await PaperTemplateModel.findById(info.templateId);

            if(existedTemplate){
                const form = new FormModel({
                    createAt: createAt,
                    templateId: info.templateId,
                    fields: info.fields,
                    markedTemplateAttachedFile: file.filename,
                    markedTemplateFileType: file.mimetype,
                    markedTemplateFileName: file.originalname
                })
    
                const result = await form.save();
                delete result.markedTemplateAttachedFile;

                existedTemplate.formId = result._id;
                await existedTemplate.save();

                res.status(200).send({ form: result })
            }
            else{
                res.status(404).send({msg: 'template not found'})
            }
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

export const deleteRemoveAForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
            let existForm = await FormModel.findById(req.params.formId)
                                           .select("_id markedTemplateAttachedFile")
                                           .lean();
            if(existForm){
                let existedTemplate = await PaperTemplateModel.findOne({formId: req.params.formId});
                if(existedTemplate){
                    unlink('uploads/forms/' + existForm.markedTemplateAttachedFile, ()=>{});
                    await FormModel.deleteOne({_id: req.params.formId});
                    existedTemplate.formId = "";
                    await existedTemplate.save();
                    res.status(200).send({msg: 'Remove successfully'})
                }
                else{
                    res.status(404).send({msg: 'Template not found'})
                }
            }
            else{
                res.status(404).send({msg: 'Form not found'})
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

export const getAFormById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.Student) {
            let existForm = await FormModel.findById(req.params.formId)
                                           .select("_id templateId fields markedTemplateFileName")
                                           .lean();
            if(existForm){
                res.status(200).send({form: existForm})
            }
            else{
                res.status(404).send({msg: 'form not founnd'})
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

export const putUpdateAForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS) {
               
            let existForm: formInterface = await FormModel.findById(req.params.formId)
                                           .select("_id")
                                           .lean();
            if(existForm){
                const update = req.body.form;
                const updatedForm = await FormModel.findOneAndUpdate({_id: req.params.formId}, update, {new: true});

                res.status(200).send({form: updatedForm})
            }
            else{
                res.status(404).send({msg: 'form not founnd'})
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

export const getFormMarkedTemplateAttachedFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const formId: string = req.params.formId;
        const form = await FormModel.findById(formId)
                                    .select("markedTemplateAttachedFile")
                                    .lean();
        if (form) {
            const file: string = form.markedTemplateAttachedFile;
            delete form.markedTemplateAttachedFile;
            res.status(200).sendFile(file , {root: "uploads/forms/"});
        }
        else {
            res.status(404).send({ msg: "Form marked template attached file not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}

export const downloadFormMarkedTemplateAttachedFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const formId: string = req.params.formId;
        const form = await FormModel.findById(formId)
                                    .select("markedTemplateAttachedFile markedTemplateFileName")
                                    .lean();
        if (form) {
            const file: string = './uploads/forms/' + form.markedTemplateAttachedFile;
            res.status(200).download(file, form.markedTemplateFileName)
        }
        else {
            res.status(404).send({ msg: "form not found" });
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}