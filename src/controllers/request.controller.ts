import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { RequestStatusEnum } from "../enums/requestStatus.enum";
import { regexInterface } from "../interface/general.interface";
import { requestInfoInterface } from "../interface/request.interface";
import { RequestTypeEnum } from "../enums/requestType.enum";
import { TopicStatusEnum } from "../enums/topicStatus.enum";
import { NotificationIntf } from "../interface/notification.interface";
const RequestModel = require('../models/request.model');
const StudentModel = require('../models/student.model');
const TopicModel = require('../models/topic.model');
const PeriodModel = require('../models/period.model')

export const getListRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || author.role == RoleTypeEnum.Student) {
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
            if (req.query.studentId){
                filter.studentId = req.query.studentId as string;
            }
            const fullList: requestInfoInterface[] = await RequestModel.find(filter)
            .select("_id");
            const totalPage = fullList.length % limit === 0 ? (fullList.length / limit) : (Math.floor(fullList.length / limit) + 1);
            const chosenFields: string[] = ["_id", "status", "type", "studentId", "topicId", "extensionTime", "createAt", "period", "text"]
            const requestList: requestInfoInterface[] = await RequestModel.find(filter)
                                                                .select(chosenFields.join(" "))
                                                                .limit(end)
                                                                .lean()
                                                                .sort({createAt: -1});
            if (end <= 0 || start >= requestList.length) {
                res.status(200).send({ requests: [], metadata:{totalPage: totalPage }});
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
                    const period: {_id?: string, period: string} = await PeriodModel.findById(request.period)
                                                                        .select("period")
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
                    if(period){
                        request.periodValue = period.period
                    }
                    else{
                        request.periodValue = ""
                    }
                    resultRequestList = resultRequestList.concat([request]);

                }
                res.status(200).send({requests: resultRequestList, metadata:{totalPage: totalPage}});
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const postNewRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.Student) {
            const requestData: requestInfoInterface = req.body.request;
            const existedSameRequestForSameTopic = await RequestModel.findOne({type: requestData.type, topicId: requestData.topicId})
            if(!existedSameRequestForSameTopic){
                const topic: {_id: string, studentId: string, name:string, period: string} = await TopicModel.findById(requestData.topicId)
                                                                                .select("studentId name period")
                                                                                .lean();
                if (topic) {
                    if (topic.studentId == author._id) {
                        requestData.studentId = author._id;
                        requestData.period = topic.period;
                        requestData.status = RequestStatusEnum.WAIT_APPROVAL;
                        requestData.createAt = (new Date()).toString();
                        const requestDoc = new RequestModel(requestData);
                        const newRequest = await requestDoc.save();
                        const notification: NotificationIntf = {
                            author: "Hệ thống",
                            subject: "Đã tạo yêu cầu thành công",
                            content: "Bạn đã tạo thành công yêu cầu " + requestData.type + " cho đề tài " + topic.name + ".",
                            createAt: (new Date()).toString(),
                            redirect: "/myRequest",
                            isRead: false
                        }
            
                        const student = await StudentModel.findById(requestData.studentId)
                        if(student){
                            let currentNotifications = student.notifications;
                            currentNotifications = currentNotifications.concat([notification]);
                            student.notifications = currentNotifications;
                            student.numNotification = student.numNotification + 1;
            
                            await student.save();
                        }
                        else{
                            res.status(404).send({msg: 'Student not found'})
                        }
                        res.status(200).send({request: newRequest})
                    }
                    else {
                        res.status(403).send({msg: "Not authorized"})
                    }
                }
                else {
                    res.status(404).send({msg: "Topic not found"})
                }
            }
            else{
                res.status(400).send({msg: "Existed same request for same topic"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
        
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            const request = await RequestModel.findById(req.params.requestId);
            if (request) {
                if (req.body.request.status) {
                    request.status = req.body.request.status
                }
                const topic: {_id?: string, name: string} = await TopicModel.findById(request.topicId).select("name").lean();
                const updatedRequest = await request.save();
                const notification: NotificationIntf = {
                    author: "Hệ thống",
                    subject: "Yêu cầu đã bị từ chối",
                    content: "Yêu cầu " + request.type + " cho đề tài " + topic.name + " đã bị từ chối.",
                    createAt: (new Date()).toString(),
                    redirect: "/myRequest",
                    isRead: false
                }
    
                const student = await StudentModel.findById(request.studentId)
                if(student){
                    let currentNotifications = student.notifications;
                    currentNotifications = currentNotifications.concat([notification]);
                    student.notifications = currentNotifications;
                    student.numNotification = student.numNotification + 1;
    
                    await student.save();
                }
                else{
                    res.status(404).send({msg: 'Student not found'})
                }
                res.status(200).send({request: updatedRequest})
            }
            else {
                res.status(404).send({msg: "Request not found"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getRequestDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        const request = await RequestModel.findById(req.params.requestId).lean();
        if (request) {
            if (author.role == RoleTypeEnum.Student && author._id != request.studentId) {
                res.status(403).send({msg: "Not authorized"})
            }
            else {
                res.status(200).send({request: request})
            }
        }
        else {
            res.status(404).send({msg: "Request not found"})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteRemoveARequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.Student) {
            const existedRequest = await RequestModel.findById(req.params.requestId).lean();
            if (existedRequest) {
                await RequestModel.deleteOne({_id: req.params.requestId})
                res.status(200).send({msg: "Success"})
            }
            else {
                res.status(404).send({err: "Request not existed"})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putApproveARequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FVD) {
            let existedRequest = await RequestModel.findById(req.params.requestId);
            if (existedRequest) {
                let chosenTopic = await TopicModel.findById(existedRequest.topicId);
                if(existedRequest.type === RequestTypeEnum.CANCEL_PROJECT){
                    chosenTopic.status = TopicStatusEnum.CANCELED

                    await TopicModel.findOneAndUpdate({_id: existedRequest.topicId}, chosenTopic, 
                        {new : true})
                    existedRequest.status = RequestStatusEnum.APPROVED;
                    await existedRequest.save();
                    res.status(200).send({msg: "approve successfully"})
                }
                else if(existedRequest.type === RequestTypeEnum.EXTEND_PROJECT){
                    chosenTopic.status = TopicStatusEnum.CARRY_OUT
                    chosenTopic.isExtended = true
                    chosenTopic.extensionTime = existedRequest.extensionTime
                    const endTime = new Date(chosenTopic.endTime);
                    const newEndTime = new Date(endTime.setMonth(endTime.getMonth() + existedRequest.extensionTime));
                    chosenTopic.endTime = newEndTime

                    await TopicModel.findOneAndUpdate({_id: existedRequest.topicId}, chosenTopic, 
                        {new : true})
                    existedRequest.status = RequestStatusEnum.APPROVED;
                    await existedRequest.save();
                    res.status(200).send({msg: "approve successfully"})
                }
                else{
                    
                    existedRequest.status = RequestStatusEnum.APPROVED;
                    await existedRequest.save();
                    res.status(200).send({msg: "approve successfully"})
                }

                const notification: NotificationIntf = {
                    author: "Hệ thống",
                    subject: "Yêu cầu đã được phê duyệt",
                    content: "Yêu cầu " + existedRequest.type + " cho đề tài " + chosenTopic.name + " đã được phê duyệt.",
                    createAt: (new Date()).toString(),
                    redirect: "/myRequest",
                    isRead: false
                }
    
                const student = await StudentModel.findById(existedRequest.studentId)
                if(student){
                    let currentNotifications = student.notifications;
                    currentNotifications = currentNotifications.concat([notification]);
                    student.notifications = currentNotifications;
                    student.numNotification = student.numNotification + 1;
    
                    await student.save();
                }
                else{
                    res.status(404).send({msg: 'Student not found'})
                }

            }
            else {
                res.status(404).send({err: "Request not existed"})
            }
        }
        else res.status(403).send({err: "You not have authorization"})
    } catch (error) {
        res.status(400).send({err: error})
    }
}