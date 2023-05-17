import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../enums/roleType.enum";
import { TopicStatusEnum } from "../enums/topicStatus.enum";
import { unlink } from "fs";

import { regexInterface } from "../interface/general.interface";
import {
    topicGeneralInterface, instructor, topicInputInterface,
    updateTopicInputForFS, updateTopicInputForStudent
} from "../interface/topic.interface";
import { NotificationIntf } from "../interface/notification.interface";

const TopicModel = require('../models/topic.model');
const AllocatedExpenseModel = require('../models/allocatedExpense.model');
const StudentModel = require('../models/student.model');
const PeriodModel = require('../models/period.model');
const RelevantPaperModel = require('../models/relevantPaper.model');


export const getListTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD ||
            (author.role == RoleTypeEnum.Student && req.query.student && author._id == req.query.student)) {
            let pageNum: number = 1;
            let limit: number = 999999;
            if (req.query.page) pageNum = parseInt(req.query.page as string);
            if (req.query.limit) limit = parseInt(req.query.limit as string);
            const start: number = limit * (pageNum - 1);
            const end: number = limit * pageNum;
            let filter: { [k: string]: regexInterface | string } = {};
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
            if (req.query.reviewCouncil || req.query.reviewCouncil === "") {
                filter.reviewCouncilId = req.query.reviewCouncil as string;
            }
            if (req.query.acceptanceCouncil || req.query.acceptanceCouncil === "") {
                filter.acceptanceCouncilId = req.query.acceptanceCouncil as string;
            }
            const chosenField: string[] = ["_id", "name", "type", "startTime", "endTime", "isExtended", "extensionTime",
                "status", "period", "productId", "studentId", "creationDate", "topicGivenId",
                "expense"];
            let fullList: topicGeneralInterface[] = [];
            let totalPage: number = 0;
            let topicsList: topicGeneralInterface[] = [];
            if (req.query.textSearch) {
                fullList = await TopicModel.find({ $text: { $search: req.query.textSearch } }).find(filter).select("_id");
                totalPage = fullList.length % limit === 0 ? (fullList.length / limit) : (Math.floor(fullList.length / limit) + 1);
                topicsList = await TopicModel.find({ $text: { $search: req.query.textSearch } }).find(filter)
                    .select(chosenField.join(" "))
                    .limit(end)
                    .lean()
                    .sort({ creationDate: -1 });
            }
            else {
                fullList = await TopicModel.find(filter).select("_id");
                totalPage = fullList.length % limit === 0 ? (fullList.length / limit) : (Math.floor(fullList.length / limit) + 1);
                topicsList = await TopicModel.find(filter)
                    .select(chosenField.join(" "))
                    .limit(end)
                    .lean()
                    .sort({ creationDate: -1 });
            }
            if (end <= 0 || start >= topicsList.length) {
                res.status(200).send({ topics: [], metadata: { totalPage: totalPage } });
            }
            else {
                const chosenTopics = topicsList.slice(start, end);
                let checkStudentValid: boolean = true;
                let topicResultList: topicGeneralInterface[] = [];
                for (let index: number = 0; (checkStudentValid && index < chosenTopics.length); index++) {
                    let topic = chosenTopics[index];
                    const student: {
                        _id: string, name: string,
                        studentId: string, educationType: string,
                        gender: string, email: string, phoneNumber: string, birthDate: string
                    } = await StudentModel.findById(topic.studentId)
                        .select("_id name studentId educationType gender email phoneNumber birthDate")
                        .lean();
                    const period: { _id: string, period: string } = await PeriodModel.findById(topic.period)
                        .select("period")
                        .lean();
                    if (student && period) {
                        topic.student = student;
                        topic.periodValue = period.period
                        topicResultList = topicResultList.concat([topic]);
                    }
                    else checkStudentValid = false
                }
                if (checkStudentValid) {
                    res.status(200).send({ topics: topicResultList, metadata: { totalPage: totalPage } });
                }
                else {
                    res.status(404).send({ msg: "some student or period not found" })
                }
            }
        }
        else {
            res.status(403).send({ msg: 'Not authorized' })
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
}

export const getTopicDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        const topicId: string = req.params.topicId;
        const chosenField: string[] = ["_id", "name", "type", "startTime", "endTime", "isExtended", "extensionTime",
            "status", "period", "productId", "studentId", "creationDate", "topicGivenId",
            "expense", "instructors", "otherMembers"];
        const topic: topicGeneralInterface = await TopicModel.findById(topicId)
            .select(chosenField.join(" "))
            .lean();
        if (author.role === RoleTypeEnum.Student && author._id !== topic.studentId) {
            res.status(403).send({ msg: "Not authorization" });
        }
        else {
            const student: {
                _id: string, name: string,
                studentId: string, educationType: string,
                gender: string, email: string, phoneNumber: string, birthDate: string
            } = await StudentModel.findById(topic.studentId)
                .select("_id name studentId educationType gender email phoneNumber birthDate")
                .lean();
            const period: { _id: string, period: string } = await PeriodModel.findById(topic.period)
                .select("period")
                .lean();
            topic.student = student;
            topic.periodValue = period.period;
            res.status(200).send({ topic: topic });
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
}

export const postAddNewTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS || author.role === RoleTypeEnum.Student) {
            const topicData: topicInputInterface = req.body.topic;
            topicData.creationDate = (new Date()).toString();
            topicData.productId = "" as string;
            topicData.status = TopicStatusEnum.NEW;
            topicData.startTime = "" as string;
            topicData.endTime = "" as string;
            topicData.topicGivenId = "" as string;
            topicData.isExtended = false;
            topicData.extensionTime = 0;
            topicData.expense = 0;
            topicData.acceptanceCouncilId = "" as string;
            topicData.reviewCouncilId = "" as string;
            if (author.role === RoleTypeEnum.Student) {
                topicData.studentId = author._id
            }
            const topic = new TopicModel(topicData);
            const newTopic = await topic.save();

            const notification: NotificationIntf = {
                author: "Hệ thống",
                subject: "Đã đăng ký thành công đề tài",
                content: "Bạn đã đăng ký mới thành công đề tài " + topicData.name + "."
                    + " Sau khi đề tài được xét duyệt thành công thì bạn có thể bắt đầu làm đề tài",
                createAt: (new Date()).toString(),
                redirect: "/myTopic",
                isRead: false
            }

            const student = await StudentModel.findById(newTopic.studentId)
                .select("_id")
                .lean();
            if (student) {
                await StudentModel.findOneAndUpdate({ _id: newTopic.studentId }, {
                    $push: {
                        notifications: notification
                    },
                    $inc: {
                        numNotification: 1
                    }
                })
                res.status(200).send({ topic: newTopic })
            }
            else {
                res.status(404).send({ msg: 'Student not found' })
            }
        }
        else {
            res.status(403).send({ msg: "Not authorization" })
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
}

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD || author.role == RoleTypeEnum.Student) {
            const existedTopic = await TopicModel.findById(req.params.topicId)
                .select("_id studentId status")
                .lean();
            if (existedTopic) {
                if (author.role === RoleTypeEnum.Student && existedTopic.studentId !== author._id) {
                    res.status(403).send({ msg: "Not authorization" })
                }
                else {
                    await TopicModel.deleteOne({ _id: req.params.topicId });
                    const paperList = await RelevantPaperModel.find({ topicId: req.params.topicId })
                        .select("_id paperAttachedFile")
                        .lean();

                    for (let i = 0; i < paperList.length; ++i) {
                        unlink('uploads/papers/' + paperList[i].paperAttachedFile, () => { });
                        await RelevantPaperModel.deleteOne({ _id: paperList[i]._id })
                    }
                    res.status(200).send({ msg: "Delete successful" });
                }
            }
            else {
                res.status(404).send({ msg: "Topic not found" })
            }
        }
        else {
            res.status(403).send({ msg: "Not authorization" })
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
}

export const putUpdateTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.FS || author.role == RoleTypeEnum.FVD) {
            const existedTopic = await TopicModel.findById(req.params.topicId)
                .select("_id period studentId name")
                .lean();
            let notExistStudent: boolean = false;
            if (existedTopic) {
                const update: updateTopicInputForFS = req.body.topic;
                const updatedTopic = await TopicModel.findOneAndUpdate({ _id: req.params.topicId }, update,
                    { new: true })
                    .lean();
                if (update.expense) {
                    const periodId = existedTopic.period;
                    const topicExpenseList: { _id: string, expense: number }[] = await TopicModel.find({ period: periodId })
                        .select("expense")
                        .lean();
                    const newExpense = topicExpenseList.reduce((prev, curr) => {
                        return {
                            _id: "",
                            expense: prev.expense + curr.expense
                        }
                    })
                    await AllocatedExpenseModel.findOneAndUpdate({ period: periodId }, {
                        usedExpense: newExpense.expense
                    })
                }
                if (update.topicGivenId && update.startTime && update.endTime && update.status === TopicStatusEnum.CARRY_OUT) {
                    const notification: NotificationIntf = {
                        author: "Hệ thống",
                        subject: "Đề tài " + existedTopic.name + " đã được bắt đầu",
                        content: "Đề tài " + existedTopic.name + " đã được chuyển sang trạng thái " + update.status + "."
                            + " Bây giờ bạn có thể bắt đầu thực hiện và nộp sản phẩm đề tài",
                        createAt: (new Date()).toString(),
                        redirect: "/myTopic",
                        isRead: false
                    }

                    const student = await StudentModel.findById(existedTopic.studentId)
                    if (student) {
                        let currentNotifications = student.notifications;
                        currentNotifications = currentNotifications.concat([notification]);
                        student.notifications = currentNotifications;
                        student.numNotification = student.numNotification + 1;

                        await student.save();
                    }
                    else {
                        notExistStudent = true;
                    }
                }
                if (notExistStudent) {
                    res.status(404).send({ msg: 'Student not found' })
                }
                else {
                    res.status(200).send({ topic: updatedTopic })
                }
            }
            else {
                res.status(404).send({ msg: "Topic not found" })
            }
        }
        else {
            const existedTopic: { _id: string, studentId: string } = await TopicModel.findById(req.params.topicId)
                .select("_id studentId")
                .lean();
            if (existedTopic.studentId === author._id) {
                if (existedTopic) {
                    const update: updateTopicInputForStudent = req.body.topic;
                    const updatedTopic = await TopicModel.findOneAndUpdate({ _id: req.params.topicId }, update,
                        { new: true })
                        .lean();
                    res.status(200).send({ topic: updatedTopic })
                }
                else {
                    res.status(404).send({ msg: "Topic not found" })
                }
            }
            else {
                res.status(403).send({ msg: "Not authorization" })
            }
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
}

export const postTopicRelevantFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.Student) {
            const existedTopic: { _id: string, studentId: string } = await TopicModel.findById(req.params.topicId)
                .select("_id studentId")
                .lean();
            if (existedTopic.studentId === author._id) {
                if (existedTopic) {
                    const update: updateTopicInputForStudent = req.body.topic;
                    const updatedTopic = await TopicModel.findOneAndUpdate({ _id: req.params.topicId }, update,
                        { new: true })
                        .lean();
                    res.status(200).send({ topic: updatedTopic })
                }
                else {
                    res.status(404).send({ msg: "Topic not found" })
                }
            }
            else {
                res.status(403).send({ msg: "Not authorization" })
            }
        }
        else {
            res.status(403).send({ msg: "Not authorization" })
        }
    } catch (error) {
        res.status(400).send({ err: error })
    }
}