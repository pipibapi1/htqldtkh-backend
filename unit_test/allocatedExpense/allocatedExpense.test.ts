import {afterAll, beforeAll, describe, expect, test, beforeEach} from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { initStudentCollection } from '../init_data/student';
import { initAllocatedExpenseColection } from '../init_data/allocatedExpense';
import { initTopicCollection } from '../init_data/topic';
import { initPeriodColection } from '../init_data/period';
dotenv.config();

const app = require('../../server');
const request = supertest(app);
const SECRETARY_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGjGsCBrw70ga2hvYSIsIl9pZCI6IjYzYjk0N2MyMjQyMTM2MzhiMjAxNDkzZCIsInN0YWZmSWQiOiIxMjM0NTY3OCIsImVtYWlsIjoic2VjcmV0YXJ5QGdtYWlsLmNvbSIsImlhdCI6MTY4MTg3NDUwM30.vXaHUTFM4uR0Vqt2uaMWfOjO-7ATi3NDD2vBGxVCPqI';
const EXPENSE_URL='/api/expense';
const allocatedExpenseModel = require('../../src/models/allocatedExpense.model');

describe('allocated expense', () => {
    let connection: mongoose.Connection;

    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        connection = mongoose.connection;
        connection.useDb('htqldtkh_db');
        await initStudentCollection();
        await initPeriodColection();
        await initAllocatedExpenseColection();
        await initTopicCollection();
    })

    afterAll(async () => {
        connection.close();
    })

    describe('get allocated expense', () => {
        test('get allocated expense by period id', async () => {
            const response = await request.get(`${EXPENSE_URL}/findByPeriod/63efa36a1c711759b6a7e463`)
                                    .set('Authorization', SECRETARY_TOKEN);
            const expected = {
                "_id": "63f24730553d2ff87ce8b38f",
                "period": "63efa36a1c711759b6a7e463",
                "allocated": [
                    {
                        "type": "Chính quy",
                        "totalExpense": 0,
                        "maxExpensePerTopic": 5000000,
                    },
                    {
                        "type": "Chất lượng cao",
                        "totalExpense": 20000000,
                        "maxExpensePerTopic": 0,
                    },
                    {
                        "type": "Chất lượng cao (LVTN)",
                        "totalExpense": 20000000,
                        "maxExpensePerTopic": 0,
                    },
                    {
                        "type": "Kĩ sư tài năng",
                        "totalExpense": 20000000,
                        "maxExpensePerTopic": 0,
                    }
                ],
                "totalExpense": 70000000,
                "generalExpense": 5000000,
                "note": "",
                "usedExpense": 0
            }
            expect(response.body.expense).toMatchObject(expected);
        })
    })

    describe('update allocated expense', () => {
        test('update allocated expense in database', async () => {
            const update = {
                "allocated": [
                    {
                        "type": "Chính quy",
                        "totalExpense": 0,
                        "maxExpensePerTopic": 2000000,
                    },
                    {
                        "type": "Chất lượng cao",
                        "totalExpense": 30000000,
                        "maxExpensePerTopic": 0,
                    },
                    {
                        "type": "Chất lượng cao (LVTN)",
                        "totalExpense": 25000000,
                        "maxExpensePerTopic": 0,
                    },
                    {
                        "type": "Kĩ sư tài năng",
                        "totalExpense": 15000000,
                        "maxExpensePerTopic": 0,
                    }
                ],
                "totalExpense": 60000000,
                "generalExpense": 4000000
            }

            const resonse = await request.put(`${EXPENSE_URL}/63f24730553d2ff87ce8b38f`)
                                    .set('Authorization', SECRETARY_TOKEN)
                                    .send({expense: update});
            const expenseInDb = await allocatedExpenseModel.findById('63f24730553d2ff87ce8b38f')
                                        .lean();
            expect(expenseInDb).toMatchObject(update);
        })
    })
})