import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { regexInterface } from "../interface/general.interface";
import { requestInfoInterface } from "../interface/request.interface";
const RequestModel = require('../models/request.model');
const StudentModel = require('../models/student.model');
const TopicModel = require('../models/topic.model');

export const getListRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            let pageNum: number = 1;
            let limit: number = 10;
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
            const chosenFields: string[] = ["_id", "status", "type", "studentId", "topicId", "extensionTime", "createAt"]
            const requestList: requestInfoInterface[] = await RequestModel.find(filter)
                                                                .select(chosenFields.join(" "))
                                                                .limit(end)
                                                                .lean()
                                                                .sort({createAt: -1});
            if (end <= 0 || start >= requestList.length) {
                res.status(200).send({ requests: [] });
            }
            else {
                const chosenRequests = requestList.slice(start, end);
                let checkStudentValid: boolean = true;
                let resultRequestList: requestInfoInterface[] = [];
                for (let index: number = 0; checkStudentValid && index < chosenRequests.length; index++) {
                    const request = chosenRequests[index];
                    const student:{_id?: string, name: string} = await StudentModel.findById(request.studentId)
                                                                        .select("name")
                                                                        .lean();
                    const topic: {_id?: string, name: string} = await TopicModel.findById(request.topicId)
                                                                        .select("name")
                                                                        .lean();
                    if (student) {
                        request.studentName = student.name;
                    }
                    else {
                        request.studentName = "";
                    }
                    if (topic) {
                        request.topicName = topic.name;

                    }
                    else {
                        request.topicName = "";
                    }
                    resultRequestList = resultRequestList.concat([request]);

                }
                res.status(200).send({requests: resultRequestList});
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}
