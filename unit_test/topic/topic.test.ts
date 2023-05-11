import {afterAll, beforeAll, describe, expect, test, beforeEach} from '@jest/globals';
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
import { TopicInfoIntf } from '../../src/interface/council.interface';
import { initPeriodColection } from '../init_data/period';

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
        connection.useDb('htqldtkh_db');
        await initPeriodColection();
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
                const response = await request.post(TOPIC_URL)
                                    .set("Authorization", STUDENT_TOKEN)
                                    .send({topic: newTopic})
                if (response.body.topic?._id){
                    await TopicModel.deleteOne({_id: response.body.topic._id});
                }
                expect(response.body.topic).toMatchObject(expected)
            }, 3000)
        
            test('should write new topic to database', async () => {
                const response = await request.post(TOPIC_URL)
                                    .set("Authorization", STUDENT_TOKEN)
                                    .send({topic: newTopic});
                const checkTopicInDb = await TopicModel.findOneAndDelete({_id: response.body.topic?._id});
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
                const response = await request.post(TOPIC_URL)
                                    .set("Authorization", SECRETARY_TOKEN)
                                    .send({topic: newTopic});
                if (response.body.topic?._id){
                    await TopicModel.deleteOne({_id: response.body.topic._id});
                }
                expect(response.body.topic).toMatchObject(expected)
            }, 3000)
        
            test('should write new topic to database', async () => {
                const response = await request.post(TOPIC_URL)
                                    .set("Authorization", SECRETARY_TOKEN)
                                    .send({topic: newTopic});
                const checkTopicInDb = await TopicModel.findOneAndDelete({_id: response.body.topic?._id});
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
                                    .set('Authorization', STUDENT_TOKEN);
                expect(response.body.topic).toMatchObject(expected)
            }, 3000)
        
            test('leader student cannot get topic of another leader', async () => {
                const response = await request.get(`${TOPIC_URL}/64493abceeb51a44b8a2c004`)
                                    .set('Authorization', STUDENT_TOKEN);
                expect(response.status).not.toBe(200);
            }, 3000)
        
            test('secretary should get topic same with expected', async () => {
                const response = await request.get(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                                    .set('Authorization', SECRETARY_TOKEN)
                expect(response.body.topic).toMatchObject(expected)
            }, 3000)
        })
        
        describe('get a list topic', () => {
        
            test('secretary should get list topic same with expected', async () => {
                const response = await request.get(`${TOPIC_URL}/?page=1&limit=5&period=63efa36a1c711759b6a7e463`)
                                    .set('Authorization', SECRETARY_TOKEN);
                const topicList: TopicInfoIntf[] = response.body.topics;
                const topicIdList = topicList.map((topic) => {
                    return topic._id;
                })
                const expected: string[] = ["64493abceeb51a44b8a2bff6", "64493abceeb51a44b8a2bff8", 
                                            "64493abceeb51a44b8a2c004", "64493abceeb51a44b8a2c006"]
                expect(topicIdList).toEqual(expected);
            }, 3000)
                    
            test('secretary should get empty list when out range', async () => {
                const response = await request.get(`${TOPIC_URL}/?page=5&limit=5&period=63efa36a1c711759b6a7e463`)
                                    .set('Authorization', SECRETARY_TOKEN);
                const topicList: TopicInfoIntf[] = response.body.topics;
                const topicIdList = topicList.map((topic) => {
                    return topic._id;
                })
                const expected: string[] = []
                expect(topicIdList).toEqual(expected);
            }, 3000)
                                
            test('secretary filter topic by type', async () => {
                const response = await request.get(`${TOPIC_URL}/?period=63efa36a1c711759b6a7e463&type=${encodeURI(TopicTypeEnum.CQ)}`)
                                    .set('Authorization', SECRETARY_TOKEN);
                const topicList: TopicInfoIntf[] = response.body.topics;
                const topicIdList = topicList.map((topic) => {
                    return topic._id;
                })
                const expected: string[] = ["64493abceeb51a44b8a2c004", "64493abceeb51a44b8a2c006"]
                expect(topicIdList).toEqual(expected);
            }, 3000)
                                            
            test('secretary filter topic by status', async () => {
                console.log(encodeURI(TopicStatusEnum.NEW))
                const response = await request.get(`${TOPIC_URL}/?period=63efa36a1c711759b6a7e463&status=${encodeURI(TopicStatusEnum.NEW)}`)
                                    .set('Authorization', SECRETARY_TOKEN);
                const topicList: TopicInfoIntf[] = response.body.topics;
                const topicIdList = topicList.map((topic) => {
                    return topic._id;
                })
                const expected: string[] = ["64493abceeb51a44b8a2bff6", "64493abceeb51a44b8a2c004"]
                expect(topicIdList).toEqual(expected);
            }, 3000)   

            test('secretary filter topic by leader id', async () => {
                const response = await request.get(`${TOPIC_URL}/?period=63efa36a1c711759b6a7e463&student=6427d7ebbe785ed24c364ea7`)
                                    .set('Authorization', SECRETARY_TOKEN);
                const topicList: TopicInfoIntf[] = response.body.topics;
                const topicIdList = topicList.map((topic) => {
                    return topic._id;
                })
                const expected: string[] = ["64493abceeb51a44b8a2bff6", "64493abceeb51a44b8a2bff8"]
                expect(topicIdList).toEqual(expected);
            }, 3000)

            test('leader can get list topic of that leader', async () => {
                const response = await request.get(`${TOPIC_URL}/?period=63efa36a1c711759b6a7e463&student=6427d7ebbe785ed24c364ea7`)
                                    .set('Authorization', STUDENT_TOKEN);
                const topicList: TopicInfoIntf[] = response.body.topics;
                const topicIdList = topicList.map((topic) => {
                    return topic._id;
                })
                const expected: string[] = ["64493abceeb51a44b8a2bff6", "64493abceeb51a44b8a2bff8"]
                expect(topicIdList).toEqual(expected);
            }, 3000)
            
            test('leader can not get list topic of other leader', async () => {
                const response = await request.get(`${TOPIC_URL}/?period=63efa36a1c711759b6a7e463`)
                                    .set('Authorization', STUDENT_TOKEN);
                expect(response.status).not.toEqual(200);
            }, 3000)
        })
    })

    describe('put topic', () => {
        
        test('secretary should get new topic after update', async () => {
            const update: {[k: string] : any} = {
                status: TopicStatusEnum.READY,
                startTime: "2022-02-01T00:00:00.000Z",
                endTime: "2022-08-01T00:00:00.000Z",
                acceptanceCouncilId: "1234561231",
                reviewCouncilId: "12232213",
                acceptanceResult: TopicResultEnum.QUALIFIED,
                reviewResult: TopicResultEnum.QUALIFIED,
                topicGivenId: "DTKH-HK222-001"
            }
            const response = await request.put(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                                        .set('Authorization', SECRETARY_TOKEN)
                                        .send({topic: update});
            expect(response.body.topic).toMatchObject(update);
        })

        test('data should be write on database', async () => {
            const update: {[k: string] : any} = {
                status: TopicStatusEnum.READY,
                startTime: "2022-02-01T00:00:00.000Z",
                endTime: "2022-08-01T00:00:00.000Z",
                acceptanceCouncilId: "1234561231",
                reviewCouncilId: "12232213",
                acceptanceResult: TopicResultEnum.QUALIFIED,
                reviewResult: TopicResultEnum.QUALIFIED,
                topicGivenId: "DTKH-HK222-001"
            }
            const response = await request.put(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                        .set('Authorization', SECRETARY_TOKEN)
                        .send({topic: update});
            const topicInDb = await TopicModel.findById(response.body.topic?._id);
            expect(topicInDb).toMatchObject(update);
        })

    })

    describe('delete topic', () => {

        beforeEach(async () => {
            await initTopicCollection();
        })

        test('leader can delete topic in "new" status', async () => {
            const response = await request.delete(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                                        .set('Authorization', STUDENT_TOKEN);
            expect(response.status).toEqual(200)
        })
        
        test('leader should delete topic on database', async () => {
            const response = await request.delete(`${TOPIC_URL}/${TEST_TOPIC_ID}`)
                                        .set('Authorization', STUDENT_TOKEN);
            const existedTopic = await TopicModel.find({_id: TEST_TOPIC_ID})
                                        .lean()
                                        .select("_id");
            expect(existedTopic.length).toEqual(0)
        })

        test('leader cannot delete topic of another leader', async () => {
            const response = await request.delete(`${TOPIC_URL}/64493abceeb51a44b8a2c004`)
                                        .set('Authorization', STUDENT_TOKEN);

            expect(response.status).not.toEqual(200);
        })

        
        test('leader cannot delete topic of another leader on database', async () => {
            const response = await request.delete(`${TOPIC_URL}/64493abceeb51a44b8a2c004`)
                                        .set('Authorization', STUDENT_TOKEN);
            const existedTopic = TopicModel.findById("64493abceeb51a44b8a2c004")
                                        .lean()
                                        .select("_id");
            expect(existedTopic).not.toBeNull();
        })
    })
})