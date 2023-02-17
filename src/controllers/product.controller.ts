import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { unlink } from "fs";
const ProductModel = require('../models/product.model');
const TopicModel = require('../models/topic.model');

export const postAddAProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const createAt = new Date();
            const modifiedAt = new Date();
            const info = JSON.parse(req.body.info);
            const product = new ProductModel({
                createAt: createAt,
                modifiedAt: modifiedAt,
                productAttachedFile: file.filename,
                productFileType: file.mimetype,
                productFileName: file.originalname,
                topicId: info.topicId,
            });
            const result = await product.save();
            const productId = result._id;

            const existedTopic = await TopicModel.findById(info.topicId)
                                                .select("_id")
                                                .lean();
            if(existedTopic){
                const update: any = {productId: productId}
                await TopicModel.findOneAndUpdate({_id: info.topicId}, update, 
                                                                        {new : true})
                                                                        .lean();
                delete result.productAttachedFile;
                res.status(200).send({ product: result})
            }
            else{
                res.status(404).send({msg: "Topic not found"})
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

export const getAProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
            
            const chosenField: string[] = ["_id", "productFileName"];
            let existProduct = await ProductModel.findOne({_id: req.params.productId})
                                                 .select(chosenField.join(" "))
                                                 .lean();
            if(existProduct){
                res.status(200).send({product: existProduct})
            }
            else{
                res.status(404).send({ msg: "product not found" });
            }
        }
        else{
            res.status(403).send({msg: 'Not authorized'})
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getAProductByTopicId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
            
            const chosenField: string[] = ["_id", "productFileName"];
            let existProduct = await ProductModel.findOne({topicId: req.params.topicId})
                                                 .select(chosenField.join(" "))
                                                 .lean();
            if(existProduct){
                res.status(200).send({product: existProduct})
            }
            else{
                res.status(404).send({ msg: "product not found" });
            }
        }
        else{
            res.status(403).send({msg: 'Not authorized'})
        }

    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateAProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
            const file: Express.Multer.File = req.file as Express.Multer.File;
            const createAt = new Date();
            const modifiedAt = new Date();
            const info = JSON.parse(req.body.info);

            let existProduct = await ProductModel.findOne({_id: req.params.productId});
            const existedTopic = await TopicModel.findById(info.topicId)
            .select("_id")
            .lean();

            if(existProduct && existedTopic){
                unlink('uploads/products/' + existProduct.productAttachedFile, ()=>{});

                existProduct.createAt = createAt;
                existProduct.modifiedAt = modifiedAt;
                existProduct.productAttachedFile = file.filename;
                existProduct.productFileType = file.mimetype;
                existProduct.productFileName = file.originalname;


                const result = await existProduct.save();
                delete result.productAttachedFile;
                res.status(200).send({ product: result })
            }
            else{
                res.status(404).send({msg: 'not found'})
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

export const deleteRemoveAProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            author.role == RoleTypeEnum.Student) {
                let existProduct = await ProductModel.findById(req.params.productId)
                                                        .select("_id productAttachedFile topicId")
                                                        .lean();

            const existedTopic = await TopicModel.findById(existProduct.topicId)
                                                        .select("_id")
                                                        .lean();
                                            
            if(existProduct && existedTopic){
                await ProductModel.deleteOne({_id: req.params.productId})
                unlink('uploads/products/' + existProduct.productAttachedFile, ()=>{});
                const update: any = {productId: ""}
                await TopicModel.findOneAndUpdate({_id: existedTopic._id}, update, 
                                                                        {new : true})
                                                                        .lean();
                res.status(200).send({msg: "Success"})
            }
            else{
                res.status(404).send({msg: 'Product not found'})
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

export const downloadProductAttachedFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const productId: string = req.params.productId;
            const product = await ProductModel.findById(productId)
                                                    .select("productAttachedFile productFileName")
                                                    .lean();
            if (product) {
                const file: string = './uploads/products/' + product.productAttachedFile;
                res.status(200).download(file, product.productFileName)
            }
            else {
                res.status(404).send({ msg: "Product not found" });
            }

    } catch (error) {
        console.log(error)
        res.status(400).send({err: error})
    }
}