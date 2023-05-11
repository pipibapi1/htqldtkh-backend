import {afterAll, beforeAll, describe, expect, test, beforeEach} from '@jest/globals';
import supertest from 'supertest';
import { initTopicCollection } from '../init_data/topic';
import { initStudentCollection } from '../init_data/student';
import { initCouncilCollection } from '../init_data/council';
import mongoose from 'mongoose';
import { DegreeEnum } from '../../src/enums/degree.enum';
import { CouncilRoleEnum } from '../../src/enums/councilRole.enum';
import { AcademyRankEnum } from '../../src/enums/academyRank.enum';
import { CouncilStatusEnum } from '../../src/enums/councilStatus.enum';
import { CouncilInfoIntf } from '../../src/interface/council.interface';
import { CouncilTypeEnum } from '../../src/enums/councilType.enum';
import { initPeriodColection } from '../init_data/period';

const app = require('../../server');
const request = supertest(app);
const CouncilModel = require('../../src/models/council.model');
const TopicModel = require('../../src/models/topic.model');
const SECRETARY_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGjGsCBrw70ga2hvYSIsIl9pZCI6IjYzYjk0N2MyMjQyMTM2MzhiMjAxNDkzZCIsInN0YWZmSWQiOiIxMjM0NTY3OCIsImVtYWlsIjoic2VjcmV0YXJ5QGdtYWlsLmNvbSIsImlhdCI6MTY4MTg3NDUwM30.vXaHUTFM4uR0Vqt2uaMWfOjO-7ATi3NDD2vBGxVCPqI';
const COUNCIL_URL='/api/council';

describe('council', () => {
    let connection: mongoose.Connection;

    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        connection = mongoose.connection;
        connection.useDb('htqldtkh_db');
        await initPeriodColection();
        await initStudentCollection();
        await initTopicCollection();
        await initCouncilCollection();
    })

    afterAll(async () => {
        connection.close();
    })

    describe('post new council', () => {
        const newCouncil = {
            "name": "Hội đồng 5",
            "type": "Xét duyệt",
            "period": "63efa36a1c711759b6a7e463",
            "time": "13:00",
            "date": "2023-06-16",
            "place": "113H6 Đại học Bách khoa Tp. HCM cơ sở 2",
            "numMembers": 1,
            "numTopics": 1,
            "members": [
                {
                    "name": "council member 1",
                    "academyRank": AcademyRankEnum.None,
                    "degree": DegreeEnum.CN,
                    "role": CouncilRoleEnum.TK,
                    "workUnit": "Đại học Bách khoa",
                    "gender": "Nam",
                    "email": "council.member1@gmail.com",
                    "phoneNumber": "0397700123"
                }
            ],
            "topics": [
                "64493abceeb51a44b8a2bff8"
            ]
        }

        const expected = {
            "name": "Hội đồng 5",
            "type": "Xét duyệt",
            "period": "63efa36a1c711759b6a7e463",
            "time": "13:00",
            "date": "2023-06-16",
            "place": "113H6 Đại học Bách khoa Tp. HCM cơ sở 2",
            "numMembers": 1,
            "members": [
                {
                    "name": "council member 1",
                    "academyRank": AcademyRankEnum.None,
                    "degree": DegreeEnum.CN,
                    "role": CouncilRoleEnum.TK,
                    "workUnit": "Đại học Bách khoa",
                    "gender": "Nam",
                    "email": "council.member1@gmail.com",
                    "phoneNumber": "0397700123"
                }
            ]
        }
        
        afterAll(async () => {
            await initTopicCollection();
        })

        test('secretary get result same as expected', async () => {
            const response = await request.post(`${COUNCIL_URL}`)
                                .set('Authorization', SECRETARY_TOKEN)
                                .send({council: newCouncil});
            if (response.body.council?._id){
                await CouncilModel.deleteOne({_id: response.body.council._id});
            }
            expect(response.body.council).toMatchObject(expected);
        })
        
        test('new council should be created in database', async () => {
            const response = await request.post(`${COUNCIL_URL}`)
                                .set('Authorization', SECRETARY_TOKEN)
                                .send({council: newCouncil});
            const existedCouncil = await CouncilModel.findOneAndDelete({_id: response.body.council?._id}).lean();
            expect(existedCouncil).toMatchObject(expected);
        })

        test('post new review council should set review council id in topic', async () => {
            const response = await request.post(`${COUNCIL_URL}`)
                                .set('Authorization', SECRETARY_TOKEN)
                                .send({council: newCouncil});
            const topic = await TopicModel.findById(newCouncil.topics[0])
                                .select('reviewCouncilId')
                                .lean();
            if (response.body.council?._id){
                await CouncilModel.deleteOne({_id: response.body.council._id});
            }
            expect(topic.reviewCouncilId).toBe(response.body.council?._id);
        })
    })

    describe('get a council', () => {
        test('secretary get council info', async () => {
            const councilDetailExpect = {
                "name": "Hội đồng xét duyệt 1",
                "status": CouncilStatusEnum.NEW,
                "type": "Xét duyệt",
                "period": "63efa36a1c711759b6a7e463",
                "time": "08:30",
                "date": "2023-06-15",
                "place": "110H6 Đại học Bách khoa Tp. HCM cơ sở 2",
                "members": [
                    {
                        "name": "Phạm Văn A",
                        "gender": "Nam",
                        "academyRank": "Không có",
                        "degree": "Không có",
                        "workUnit": "Đại học Bách khoa Tp. HCM",
                        "email": "phamvana@gmail.com",
                        "phoneNumber": "0397720444",
                        "role": "Ủy viên"
                    }
                ],
                "topicGeneralInfos": [
                    {
                        "_id": "64493abceeb51a44b8a2bff8"
                    }
                ]
            }
            const response = await request.get(`${COUNCIL_URL}/64562df79ed8dbcbf591ad64`)
                                .set('Authorization', SECRETARY_TOKEN);
            expect(response.body.council).toMatchObject(councilDetailExpect)
        })
    })

    describe('get list council', () => {
        test('secretary get list council', async () => {
            const response = await request.get(`${COUNCIL_URL}?period=63efa36a1c711759b6a7e463&type=${encodeURI(CouncilTypeEnum.XD)}`)
                                .set('Authorization', SECRETARY_TOKEN);
            const councilList: CouncilInfoIntf[] = response.body.councils;
            const councilIdList = councilList.map((council) => council._id);
            const exected = ["64562df79ed8dbcbf591ad64", "64562df79ed8dbcbf591ad70",
                            "64562df79ed8dbcbf591ad89", "64562df79ed8dbcbf591ad9a"]
            expect(councilIdList).toEqual(exected);
        })
    })

    describe('get council statistic', () => {
        test('result should same as expected', async () => {
            const response = await request.get(`${COUNCIL_URL}/statistics?period=63efa36a1c711759b6a7e463&type=${encodeURI(CouncilTypeEnum.XD)}`)
                                .set('Authorization', SECRETARY_TOKEN);
            const expected = {
                "topicNeedCouncil": 2,
                "topicHadCouncil": 1,
                "numCouncil": 4
            };
            expect(response.body.councilStatistics).toEqual(expected);
        })
    })

    describe('update council', () => {
        beforeEach(async () => {
            await initTopicCollection();
            await initCouncilCollection();
        })

        test('update general info of council', async () => {
            const update = {
                "date": "16/02/2023",
                "place": "Tòa H6 ĐHBK cơ sở 2",
                "members": [
                  {
                    "name": "council member 1",
                    "academyRank": "",
                    "degree": "Cử nhân",
                    "role": "Thư ký",
                    "workUnit": "Đại học Bách khoa",
                    "gender": "Nam",
                    "email": "council.member1@gmail.com",
                    "phoneNumber": "0397700123"
                  }
                ]            
            }
            const response = await request.put(`${COUNCIL_URL}/64562df79ed8dbcbf591ad64`)
                                    .set('Authorization', SECRETARY_TOKEN)
                                    .send({council: update});
            const councilInDb = await CouncilModel.findById("64562df79ed8dbcbf591ad64").lean();
            expect(councilInDb).toMatchObject(update);
        })
    })

    describe('delete council', () => {
        beforeEach(async () => {
            await initCouncilCollection();
            await initTopicCollection();
        })

        test('delete council in database', async () => {
            const response = await request.delete(`${COUNCIL_URL}/64562df79ed8dbcbf591ad64`)
                                    .set('Authorization', SECRETARY_TOKEN);
            const existedCouncil = await CouncilModel.findById("64562df79ed8dbcbf591ad64")
                                            .lean();
            expect(existedCouncil).toBeNull();
        })

        test('delete council should set council id in topic to empty', async () => {
            const response = await request.delete(`${COUNCIL_URL}/64562df79ed8dbcbf591ad64`)
                                    .set('Authorization', SECRETARY_TOKEN);
            const topic = await TopicModel.findById('64493abceeb51a44b8a2bff8');
            expect(topic.reviewCouncilId).toBe('');
        })
    })
})