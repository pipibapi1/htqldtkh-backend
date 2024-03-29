import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { topicConditionIntf } from "../interface/topicCondition.interface";
import { TopicTypeEnum } from "../enums/topicType.enum";
const TopicConditionModel = require('../models/topicCondition.model')

export const getTopicCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typeTopic: string = req.query.type as string;
        if (typeTopic) {
            const topicCondition: topicConditionIntf[] = await TopicConditionModel.find({type: typeTopic})
                                                            .limit(1)
                                                            .sort({createAt: -1})
                                                            .lean();
            res.status(200).send({topicCondition: topicCondition[0]});
        }
        else {
            res.status(400).send({msg: "Not valid type"})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getTopicTypeAvailable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typeLeader: string = req.query.leader as string;
        if (typeLeader) {
            let latestConditions: topicConditionIntf[] = [];
            const topicTypes = Object.values(TopicTypeEnum);
            for (let index in topicTypes) {
                const topicCondition: topicConditionIntf[] = await TopicConditionModel.find({type: topicTypes[index]})
                                                                .limit(1)
                                                                .sort({createAt: -1})
                                                                .lean();
                if (topicCondition) {
                    latestConditions.push(topicCondition[0]);
                }
            }
            const result = latestConditions.filter((condition) => {
                if (condition.leaderCondition?.find((ele) => ele == typeLeader))
                {
                    return true;
                }
                return false
            }).map((condition) => {
                return condition.type
            })
            res.status(200).send({types: result});
        }
        else {
            res.status(400).send({msg: "Not valid type"})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const postTopicCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS ) {
            const topicCondition: topicConditionIntf = req.body.topicCondition;
            topicCondition.createAt = (new Date()).toString();
            const newTopicCondition = new TopicConditionModel(topicCondition);
            const result: topicConditionIntf = await newTopicCondition.save();
            res.status(200).send({topicCondition: result})
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteTopicCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS ) {
            await TopicConditionModel.deleteOne({_id: req.params.topicConditionId});
            res.status(200).send({msg: "Success"});
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateTopicCondition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS ) {
            const topicCondition = await TopicConditionModel.findById(req.params.topicConditionId);
            if (topicCondition) {
                topicCondition.expression = req.body.topicCondition.expression;
            }
            else {
                res.status(404).send({msg: "Topic condition not found"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}