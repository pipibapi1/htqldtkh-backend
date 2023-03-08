import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum} from "../enums/roleType.enum";
import { CouncilStatusEnum } from "../enums/councilStatus.enum";
import { CouncilInfoIntf, CouncilDetailIntf, CouncilMemberIntf, 
    TopicInfoIntf, CouncilInputIntf } from "../interface/council.interface";
import { CouncilTypeEnum } from "../enums/councilType.enum";

const CouncilModel = require('../models/council.model');
const TopicModel = require('../models/topic.model');
const StudentModel = require('../models/student.model');
const InstructorModel = require('../models/instructor.model');

interface topicReviewCouncilInfo {
    _id: string,
    reviewCouncilId?: string
}

interface topicAcceptanceCouncilInfo {
    _id: string,
    acceptanceCouncilId?: string
}

export const postNewCouncil = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            const councilData: CouncilInputIntf = req.body.council;
            councilData.lastModified = (new Date()).toString();
            councilData.status = CouncilStatusEnum.NEW;
            councilData.numMembers = councilData.members.length;
            councilData.numTopics = councilData.topics.length;
            const newCouncil = new CouncilModel(councilData);
            const result = await newCouncil.save();
            const topicList = councilData.topics;
            for (let index in councilData.topics){
                const currTopicId = topicList[index];
                let update: {acceptanceCouncilId?: string, reviewCouncilId?: string} = {};
                if (councilData.type === CouncilTypeEnum.XD) {
                    update.reviewCouncilId = result._id;
                }
                else {
                    update.acceptanceCouncilId = result._id;
                }
                await TopicModel.findOneAndUpdate({_id: currTopicId}, update, {new: true});
            }
            res.status(200).send({council: result})
        }
        else {
            res.status(403).send({})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getCouncilDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            const councilId: string = req.params.councilId;
            let council: CouncilDetailIntf = await CouncilModel.findById(councilId)
                                                        .lean();
            if (council) {
                let filter = {};
                if (council.type === CouncilTypeEnum.XD) {
                    filter = {
                        reviewCouncilId: council._id
                    }
                    const chosenField = ["name", "topicGivenId", "reviewResult", "studentId", "instructorsId", 
                                        "type"]
                    let topicArray: TopicInfoIntf[] = await TopicModel.find(filter)
                                                        .select(chosenField.join(" "))
                                                        .lean();
                    for (let index = 0; index < topicArray.length; index++) {
                        const currTopic = topicArray[index];
                        const leader: {name: string} = await StudentModel.findById(currTopic.studentId)
                                                            .select("name")
                                                            .lean();
                        topicArray[index].studentName = leader.name;
                        currTopic.instructorsName = [];
                        const instructorIdList = currTopic.instructorsId? currTopic.instructorsId : [];
                        for(let instructorIdx = 0; instructorIdx < instructorIdList.length; instructorIdx++) {
                            const instructorId = instructorIdList[instructorIdx]
                            const instructor: {_id: string, name: string} = await InstructorModel.findById(instructorId)
                                                                                .select("name")
                                                                                .lean();
                            currTopic.instructorsName.push(instructor.name);
                        }
                        delete currTopic.instructorsId;
                    }
                    council.topicGeneralInfos = topicArray;
                    council.numTopics = topicArray.length;
                    res.status(200).send({council: council})
                }
                else {
                    filter = {
                        acceptanceCouncilId: council._id
                    }
                    const chosenField = ["name", "topicGivenId", "acceptanceResult", "studentId", "instructorsId", 
                                        "type"]
                    let topicArray: TopicInfoIntf[] = await TopicModel.find(filter)
                                                        .select(chosenField.join(" "))
                                                        .lean();
                    console.log(topicArray)
                    for (let index = 0; index < topicArray.length; index++) {
                        const currTopic = topicArray[index];
                        const leader: {name: string} = await StudentModel.findById(currTopic.studentId)
                                                            .select("name")
                                                            .lean();
                        topicArray[index].studentName = leader.name;
                        currTopic.instructorsName = [];
                        const instructorIdList = currTopic.instructorsId? currTopic.instructorsId : [];
                        for(let instructorIdx = 0; instructorIdx < instructorIdList.length; instructorIdx++) {
                            const instructorId = instructorIdList[instructorIdx]
                            const instructor: {_id: string, name: string} = await InstructorModel.findById(instructorId)
                                                                                .select("name")
                                                                                .lean();
                            currTopic.instructorsName.push(instructor.name);
                        }
                        delete currTopic.instructorsId;
                    }
                    council.topicGeneralInfos = topicArray;
                    res.status(200).send({council: council})
                }
            }
            else {
                res.status(404).send({msg: "Council not found"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getListCouncil = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            let pageNum: number = 1;
            let limit: number = 10;
            if (req.query.page) pageNum = parseInt(req.query.page as string);
            if (req.query.limit) limit = parseInt(req.query.limit as string);
            const start: number = limit * (pageNum - 1);
            const end: number = limit * pageNum;
            const periodId = req.query.period;
            const type = req.query.type;
            let filter = undefined;
            if (periodId && type) {
                filter = {
                    period: periodId,
                    type: type
                }
            }
            if (filter) {
                const chosenField = ['name', 'status', 'time', 'date', 'place', 'numMembers', 
                                    'lastModified']
                const councilList: CouncilInfoIntf[] = await CouncilModel.find(filter)
                                                            .select(chosenField.join(" "))
                                                            .limit(end)
                                                            .lean();
                if (end <= 0 || start >= councilList.length) {
                    res.status(200).send({councils: []});
                }
                else {
                    const chosenCouncils = councilList.slice(start, end);
                    for (let idx in chosenCouncils) {
                        const currCouncil = chosenCouncils[idx];
                        let topicFilter = {};
                        if (type === CouncilTypeEnum.XD) {
                            topicFilter = {
                                reviewCouncilId: currCouncil._id,
                                period: periodId
                            }
                        }
                        const topicsInCouncil = await TopicModel.find(topicFilter)
                                                        .select("_id")
                                                        .lean();
                        currCouncil.numTopics = topicsInCouncil.length;
                    }              
                    res.status(200).send({councils: chosenCouncils});
                }
            }
            else {
                res.status(409).send({msg: 'Invalid query'})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const putUpdateCouncil = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            const councilId = req.params.councilId;
            const updatableField = ['name', 'status', 'time', 'date', 'place', 'members',
                                    'numMembers'];
            let updateCouncil: any = await CouncilModel.findById(councilId);
            const updateData: {[k: string] : any} = req.body.council;
            if (updateCouncil) {
                for (let index in updatableField) {
                    const field = updatableField[index];
                    if (updateData[field]) {
                        updateCouncil[field] = updateData[field];
                    }
                }
                updateCouncil.lastModified = (new Date()).toString();
                const result = await updateCouncil.save();
                res.status(200).send({council: result});
            }
            else {
                res.status(404).send({msg: 'Council not found'})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const deleteCouncil = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            const councilId = req.params.councilId;
            const existedCouncil = await CouncilModel.findById(councilId)
                                            .select("type")
                                            .lean();
            if (existedCouncil) {
                await CouncilModel.findOneAndDelete({_id: councilId});
                if (existedCouncil.type === CouncilTypeEnum.XD) {
                    await TopicModel.updateMany({reviewCouncilId: councilId}, {$set:{reviewCouncilId: ""}})
                }
                else {
                    await TopicModel.updateMany({acceptanceCouncilId: councilId}, {$set:{acceptanceCouncilId: ""}})
                }
            }
            res.status(200).send({msg: 'delete successful'})
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const postAddTopicToCouncil = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            const councilId = req.params.councilId;
            let existedCouncil = await CouncilModel.findById(councilId);
            if (existedCouncil) {
                const topicList: string[] = req.body.topics;
                let update = {};
                if (existedCouncil.type === CouncilTypeEnum.XD) {
                    update = {
                        reviewCouncilId: existedCouncil._id
                    }
                }
                else {
                    update = {
                        acceptanceCouncilId: existedCouncil._id
                    }
                }
                for (let index in topicList) {
                    const topicId = topicList[index];
                    await TopicModel.findOneAndUpdate({_id: topicId}, update);
                }
                res.status(200).send({council: existedCouncil});
            }
            else {
                res.status(404).send({msg: 'Council not found'})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}

export const getCouncilStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role === RoleTypeEnum.FS) {
            const type = req.query.type as string;
            const period = req.query.period as string;
            if (type && period) {
                if (type === CouncilTypeEnum.XD) {
                    const topicNeedCouncilFilter = {
                        period: period
                    }
                    const topicNeedCouncil: topicReviewCouncilInfo[] = await TopicModel.find(topicNeedCouncilFilter)
                                                                    .select("reviewCouncilId")
                                                                    .lean();
                    const topicHadCouncil = topicNeedCouncil.filter((topic) => {
                        return topic.reviewCouncilId && topic.reviewCouncilId !== ""
                    })
                    const councilFilter = {
                        period: period,
                        type: type
                    }
                    const reviewCouncil: {_id: string}[] = await CouncilModel.find(councilFilter)
                                                                .select("_id")
                                                                .lean();
                    res.status(200).send({
                        councilStatistics: {
                            topicNeedCouncil: topicNeedCouncil.length,
                            topicHadCouncil: topicHadCouncil.length,
                            numCouncil: reviewCouncil.length
                        }
                    })
                }
                else {
                    const topicNeedCouncilFilter = {
                        period: period
                    }
                    const topicNeedCouncil: topicAcceptanceCouncilInfo[] = await TopicModel.find(topicNeedCouncilFilter)
                                                                    .select("acceptanceCouncilId")
                                                                    .lean();
                    const topicHadCouncil = topicNeedCouncil.filter((topic) => {
                        return topic.acceptanceCouncilId && topic.acceptanceCouncilId !== ""
                    })
                    const councilFilter = {
                        period: period,
                        type: type
                    }
                    const acceptanceCouncil: {_id: string}[] = await CouncilModel.find(councilFilter)
                                                                .select("_id")
                                                                .lean();
                    res.status(200).send({
                        councilStatistics: {
                            topicNeedCouncil: topicNeedCouncil.length,
                            topicHadCouncil: topicHadCouncil.length,
                            numCouncil: acceptanceCouncil.length
                        }
                    })
                }
            }
            else {
                res.status(400).send({msg: "Missing field"})
            }
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}