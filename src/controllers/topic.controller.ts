import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";

import { regexInterface } from "../interface/general.interface";
import { topicGeneralInterface, instructor } from "../interface/topic.interface";

const TopicModel = require('../models/topic.model');
const StudentModel = require('../models/student.model');
const InstructorModel = require('../models/instructor.model');


export const getListTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || 
            (author.role == RoleTypeEnum.Student && req.query.student && author._id == req.query.student)) 
        {
            let pageNum: number = 1;
            let limit: number = 999999;
            if (req.query.page) pageNum = parseInt(req.query.page as string);
            if (req.query.limit) limit = parseInt(req.query.limit as string);
            const start: number = limit * (pageNum - 1);
            const end: number = limit * pageNum;
            let filter: {[k: string]: regexInterface | string} = {};
            if (req.query.period) {
                filter.period = req.query.period as string;
            }
            if (req.query.type) {
                filter.type = req.query.type as string;
            }
            if (req.query.status) {
                filter.status = req.query.status as string;
            }
            if (req.query.isExtended) {
                filter.isExtended = req.query.isExtended as string;
            }
            if (req.query.student) {
                filter.studentId = req.query.student as string;
            }
            const chosenField: string[] = ["_id", "name", "type", "startTime", "endTime", "isExtended", "extensionTime",
                                            "status", "period", "productPath", "studentId", "creationDate", "topicGivenId", "expense"];
            const fullList: topicGeneralInterface[] = await TopicModel.find(filter)
                                                                    .select("_id");
            const totalPage = fullList.length % limit === 0 ? (fullList.length / limit) : (Math.floor(fullList.length / limit) + 1);
            const topicsList: topicGeneralInterface[] = await TopicModel.find(filter)
                                            .select(chosenField.join(" "))
                                            .limit(end)
                                            .lean()
                                            .sort({creationDate: -1});
            if (end <= 0 || start >= topicsList.length) {
                res.status(200).send({ topics: [], metadata:{totalPage: totalPage} });
            }
            else {
                const chosenTopics = topicsList.slice(start, end);
                let checkStudentValid: boolean = true;
                let topicResultList: topicGeneralInterface[] = [];
                for (let index: number = 0; (checkStudentValid && index < chosenTopics.length); index++) {
                    let topic = chosenTopics[index];
                    const student: {_id: string, name: string} = await StudentModel.findById(topic.studentId)
                                                                                    .select("name")
                                                                                    .lean();
                    if (student) {
                        topic.student = student;
                        topicResultList = topicResultList.concat([topic]);
                    }
                    else checkStudentValid = false
                }
                if (checkStudentValid) {
                    res.status(200).send({topics: topicResultList, metadata:{totalPage: totalPage}});
                }
                else {
                    res.status(404).send({msg: "some student not found"})
                }
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getTopicDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        const topicId: string = req.params.topicId;
        const chosenField: string[] = ["_id", "name", "type", "startTime", "endTime", "isExtended", "extensionTime",
                                        "status", "period", "productPath", "studentId", "creationDate", "topicGivenId",
                                        "expense", "instructorsId", "otherMembers"];
        const topic: topicGeneralInterface = await TopicModel.findById(topicId)
                                                .select(chosenField.join(" "))
                                                .lean();
        if (author.role === RoleTypeEnum.Student && author._id !== topic.studentId) {
            res.status(403).send({msg: "Not authorization"});
        }
        else {
            const student: {_id: string, name: string} = await StudentModel.findById(topic.studentId)
                                                                            .select("name")
                                                                            .lean();
            topic.student = student;
            topic.instructors = [];
            const instructorIdList = topic.instructorsId as string[];
            for (let index in instructorIdList) {
                const instructorId = instructorIdList[index];
                const instructor: instructor = await InstructorModel.findById(instructorId)
                                                            .lean();
                topic.instructors = topic.instructors.concat([instructor]);
            }
            res.status(200).send({topic: topic});
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}