import {describe, expect, test} from '@jest/globals';
import axios from 'axios';
import mongoose from 'mongoose';
import { topicInputInterface } from '../src/interface/topic.interface';
import { TopicTypeEnum } from '../src/enums/topicType.enum';
import { TopicStatusEnum } from '../src/enums/topicStatus.enum';
import { TopicResultEnum } from '../src/enums/topicResult.enum';
const TopicModel = require('../src/models/topic.model')

const STUDENT_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2luaCB2acOqbiIsIl9pZCI6IjY0MjdkN2ViYmU3ODVlZDI0YzM2NGVhNyIsInN0dWRlbnRJZCI6IjIxMTAyMjAiLCJlbWFpbCI6ImxlcXVvY2RhaUBnbWFpbC5jb20iLCJpYXQiOjE2ODE4NzQ0MzZ9.VfTygsUWFJNxnniMEPxcHIOBPeqNqkO9F3jG8Bib3ts';
const SECRETARY_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGjGsCBrw70ga2hvYSIsIl9pZCI6IjYzYjk0N2MyMjQyMTM2MzhiMjAxNDkzZCIsInN0YWZmSWQiOiIxMjM0NTY3OCIsImVtYWlsIjoic2VjcmV0YXJ5QGdtYWlsLmNvbSIsImlhdCI6MTY4MTg3NDUwM30.vXaHUTFM4uR0Vqt2uaMWfOjO-7ATi3NDD2vBGxVCPqI';
const TOPIC_API='http://localhost:8000/api/topic'
describe('post new topic', () => {
    test('KSTN student post topic 1', async () => {
        const newTopic: topicInputInterface = {
            name: 'Hệ thống thử 1',
            type: TopicTypeEnum.CQ,
            period: '63efa36a1c711759b6a7e463',
            status: '',
            studentId: '',
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
                    phoneNumber: "38647256",
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
            name: 'Hệ thống thử 1',
            type: TopicTypeEnum.CQ,
            period: '63efa36a1c711759b6a7e463',
            status: TopicStatusEnum.NEW,
            studentId: '6427d7ebbe785ed24c364ea7',
            productId: '',
            topicGivenId: '',
            instructorsId: ["FAKESTAFFID002"],
            instructors: [
                {
                    staffId: "FAKESTAFFID002",
                    name: "Quản Thành Thơ",
                    gender: "Nam",
                    email: "qttho@hcmut.edu.vn",
                    phoneNumber: "38647256",
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
        const result = await axios.post(TOPIC_API, {topic: newTopic},
            {
                headers: {
                    Authorization: STUDENT_TOKEN
                }
            })
        if (result.data.topic?._id) {
            await TopicModel.deleteOne({_id: result.data.topic._id})
        }
        expect(result.data.topic).toMatchObject(expected)
    })
})