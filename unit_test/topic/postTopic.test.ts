import {afterAll, beforeAll, describe, expect, test} from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { topicInputInterface } from '../../src/interface/topic.interface';
import { TopicTypeEnum } from '../../src/enums/topicType.enum';
import { TopicStatusEnum } from '../../src/enums/topicStatus.enum';
import { TopicResultEnum } from '../../src/enums/topicResult.enum';
import dotenv from 'dotenv';
dotenv.config();
import { initStudentCollection } from '../init_data/student';
import { initTopicCollection } from '../init_data/topic';

const TopicModel = require('../../src/models/topic.model');
const app = require('../../server');
const STUDENT_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2luaCB2acOqbiIsIl9pZCI6IjY0MjdkN2ViYmU3ODVlZDI0YzM2NGVhNyIsInN0dWRlbnRJZCI6IjIxMTAyMjAiLCJlbWFpbCI6ImxlcXVvY2RhaUBnbWFpbC5jb20iLCJpYXQiOjE2ODE4NzQ0MzZ9.VfTygsUWFJNxnniMEPxcHIOBPeqNqkO9F3jG8Bib3ts';
const SECRETARY_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGjGsCBrw70ga2hvYSIsIl9pZCI6IjYzYjk0N2MyMjQyMTM2MzhiMjAxNDkzZCIsInN0YWZmSWQiOiIxMjM0NTY3OCIsImVtYWlsIjoic2VjcmV0YXJ5QGdtYWlsLmNvbSIsImlhdCI6MTY4MTg3NDUwM30.vXaHUTFM4uR0Vqt2uaMWfOjO-7ATi3NDD2vBGxVCPqI';
const TOPIC_URL='/api/topic';
const TEST_TOPIC_ID = '64493abceeb51a44b8a2bff6';
const request = supertest(app);
describe('topic', () => {
    let connection: mongoose.Connection;

    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        connection = mongoose.connection;
        connection.useDb('htqldtkh_db')
        await initStudentCollection();
        await initTopicCollection();
    })

    afterAll(async () => {
        connection.close();
    })

    describe('post topic', () => {
        describe('student post new topic', () => {
            const newTopic: topicInputInterface = {
                name: 'Hệ thống chuyển văn bản thành hình ảnh',
                type: TopicTypeEnum.KSTN,
                period: '63efa36a1c711759b6a7e463',
                status: '',
                studentId: '',
                creationDate: '',
                productId: '',
                topicGivenId: '',
                instructorsId: ["FAKESTAFFID001"],
                instructors: [
                    {
                        staffId: "FAKESTAFFID001",
                        name: "Bùi Hoài Thắng",
                        gender: "Nam",
                        email: "bhthang@hcmut.edu.vn",
                        phoneNumber: "38658689",
                        academyRank: "Phó giáo sư",
                        degree: "Tiến sỹ"
                    }
                ],
                isExtended: false,
                extensionTime: 0,
                expense: 0,
                acceptanceCouncilId: '',
                reviewCouncilId: '',
                otherMembers: [
                    {
                        "studentId": "1912916",
                        "name": "Phạm Minh Duy",
                        "gender": "Nam",
                        "email": "duy.pham1711a@hcmut.edu.vn",
                        "phoneNumber": "",
                        "educationType": "Chính quy",
                        "birthDate": "2001-11-17"
                    }
                ]
            }
        
            const expected = {
                _id: expect.stringMatching('.*'),
                name: 'Hệ thống chuyển văn bản thành hình ảnh',
                type: TopicTypeEnum.KSTN,
                period: '63efa36a1c711759b6a7e463',
                status: TopicStatusEnum.NEW,
                studentId: '6427d7ebbe785ed24c364ea7',
                productId: '',
                topicGivenId: '',
                instructorsId: ["FAKESTAFFID001"],
                instructors: [
                    {
                        staffId: "FAKESTAFFID001",
                        name: "Bùi Hoài Thắng",
                        gender: "Nam",
                        email: "bhthang@hcmut.edu.vn",
                        phoneNumber: "38658689",
                        academyRank: "Phó giáo sư",
                        degree: "Tiến sỹ"
                    }
                ],
                isExtended: false,
                extensionTime: 0,
                expense: 0,
                acceptanceCouncilId: '',
                reviewCouncilId: '',
                acceptanceResult: TopicResultEnum.WAITING,
                reviewResult: TopicResultEnum.WAITING,
                otherMembers: [
                    {
                        studentId: "1912916",
                        name: "Phạm Minh Duy",
                        gender: "Nam",
                        email: "duy.pham1711a@hcmut.edu.vn",
                        phoneNumber: "",
                        educationType: "Chính quy",
                        birthDate: "2001-11-17"
                    }
                ]
            }
        
            test('should response topic same with expected', async () => {
                const response = request.post(TOPIC_URL)
                                    .set("Authorization", STUDENT_TOKEN)
                                    .send({topic: newTopic})
                                    .then((result) => {
                                        return result.body.topic;
                                    })
                expect(response).resolves.toMatchObject(expected)
            }, 3000)
        
            test('should write new topic to database', async () => {
                const response = await request.post(TOPIC_URL)
                                    .set("Authorization", STUDENT_TOKEN)
                                    .send({topic: newTopic});
                const checkTopicInDb = await TopicModel.findOne({_id: response.body.topic?._id});
                expect(checkTopicInDb).not.toBeNull();
            }, 3000)
        })
        
        describe('secretary post new topic', () => {
            const newTopic: topicInputInterface = {
                name: 'Hệ thống quản lý đề tài nghiên cứu khoa học',
                type: TopicTypeEnum.CQ,
                period: '63efa36a1c711759b6a7e463',
                status: '',
                studentId: '641b292640220cc79148bd8c',
                creationDate: '',
                productId: '',
                topicGivenId: '',
                instructorsId: ["FAKESTAFFID002"],
                instructors: [
                    {
                        staffId: "FAKESTAFFID002",
                        name: "Quản Thành Thơ",
                        gender: "Nam",
                        email: "qttho@hcmut.edu.vn",
                        phoneNumber: "38658689",
                        academyRank: "Phó giáo sư",
                        degree: "Tiến sỹ"
                    }
                ],
                isExtended: false,
                extensionTime: 0,
                expense: 0,
                acceptanceCouncilId: '',
                reviewCouncilId: '',
                otherMembers: [
                    {
                        "studentId": "1912916",
                        "name": "Phạm Minh Duy",
                        "gender": "Nam",
                        "email": "duy.pham1711a@hcmut.edu.vn",
                        "phoneNumber": "",
                        "educationType": "Chính quy",
                        "birthDate": "2001-11-17"
                    }
                ]
            }
        
            const expected = {
                _id: expect.stringMatching('.*'),
                name: 'Hệ thống quản lý đề tài nghiên cứu khoa học',
                type: TopicTypeEnum.CQ,
                period: '63efa36a1c711759b6a7e463',
                status: TopicStatusEnum.NEW,
                studentId: '641b292640220cc79148bd8c',
                productId: '',
                topicGivenId: '',
                instructorsId: ["FAKESTAFFID002"],
                instructors: [
                    {
                        staffId: "FAKESTAFFID002",
                        name: "Quản Thành Thơ",
                        gender: "Nam",
                        email: "qttho@hcmut.edu.vn",
                        phoneNumber: "38658689",
                        academyRank: "Phó giáo sư",
                        degree: "Tiến sỹ"
                    }
                ],
                isExtended: false,
                extensionTime: 0,
                expense: 0,
                acceptanceCouncilId: '',
                reviewCouncilId: '',
                acceptanceResult: TopicResultEnum.WAITING,
                reviewResult: TopicResultEnum.WAITING,
                otherMembers: [
                    {
                        studentId: "1912916",
                        name: "Phạm Minh Duy",
                        gender: "Nam",
                        email: "duy.pham1711a@hcmut.edu.vn",
                        phoneNumber: "",
                        educationType: "Chính quy",
                        birthDate: "2001-11-17"
                    }
                ]
            }
        
            test('should response topic same with expected', async () => {
                const response = request.post(TOPIC_URL)
                                    .set("Authorization", SECRETARY_TOKEN)
                                    .send({topic: newTopic})
                                    .then((result) => {
                                        return result.body.topic;
                                    })
                expect(response).resolves.toMatchObject(expected)
            }, 3000)
        
            test('should write new topic to database', async () => {
                const response = await request.post(TOPIC_URL)
                                    .set("Authorization", SECRETARY_TOKEN)
                                    .send({topic: newTopic});
                const checkTopicInDb = await TopicModel.findOne({_id: response.body.topic?._id});
                expect(checkTopicInDb).not.toBeNull();
            }, 3000)
        })
    })

    describe('get topic', () => {
        describe('get a topic', () => {
            const expected = {
                _id: expect.stringMatching('.*'),
                name: "Hệ thống chuyển văn bản thành hình ảnh",
                type: "Kĩ sư tài năng",
                startTime: "",
                endTime: "",
                isExtended: false,
                extensionTime: 0,
                expense: 0,
                status: "Tạo mới",
                period: "63efa36a1c711759b6a7e463",
                productId: "",
                studentId: "6427d7ebbe785ed24c364ea7",
                creationDate: "2023-04-26T14:52:44.000Z",
                instructors: [
                    {
                        staffId: "FAKESTAFFID001",
                        name: "Bùi Hoài Thắng",
                        gender: "Nam",
                        email: "bhthang@hcmut.edu.vn",
                        phoneNumber: "38658689",
                        academyRank: "Phó giáo sư",
                        degree: "Tiến sỹ"
                    }
                ],
                otherMembers: [
                    {
                        studentId: "1912916",
                        name: "Phạm Minh Duy",
                        gender: "Nam",
                        email: "duy.pham1711a@hcmut.edu.vn",
                        phoneNumber: "",
                        educationType: "Chính quy",
                        birthDate: "2001-11-17"
                    }
                ],
                topicGivenId: ""
            }
        
            test('leader student should get topic same with expected', async () => {
                const response = await request.get(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                                    .set('Authorization', STUDENT_TOKEN)
                expect(response.body.topic).toMatchObject(expected)
            }, 3000)
        
            test('secretary should get topic same with expected', async () => {
                const response = await request.get(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                                    .set('Authorization', SECRETARY_TOKEN)
                expect(response.body.topic).toMatchObject(expected)
            }, 3000)
        })
    })
})