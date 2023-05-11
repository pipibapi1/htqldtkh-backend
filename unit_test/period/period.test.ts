import {afterAll, beforeAll, describe, expect, test, beforeEach} from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { initPeriodColection } from '../init_data/period';
import { PeriodStatusEnum } from '../../src/enums/periodStatus.enum';
import { initAllocatedExpenseColection } from '../init_data/allocatedExpense';
import { periodInterface } from '../../src/interface/period.interface';
dotenv.config();

const app = require('../../server');
const request = supertest(app);
const SECRETARY_TOKEN='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGjGsCBrw70ga2hvYSIsIl9pZCI6IjYzYjk0N2MyMjQyMTM2MzhiMjAxNDkzZCIsInN0YWZmSWQiOiIxMjM0NTY3OCIsImVtYWlsIjoic2VjcmV0YXJ5QGdtYWlsLmNvbSIsImlhdCI6MTY4MTg3NDUwM30.vXaHUTFM4uR0Vqt2uaMWfOjO-7ATi3NDD2vBGxVCPqI';
const PERIOD_URL='/api/period';
const PeriodModel = require('../../src/models/period.model');

describe('period', () => {
    let connection: mongoose.Connection;

    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        connection = mongoose.connection;
        connection.useDb('htqldtkh_db');
        await initPeriodColection();
        await initAllocatedExpenseColection();
    })

    afterAll(async () => {
        connection.close();
    })

    describe('post new period', () => {
        beforeEach(async () => {
            await initPeriodColection();
        })

        const newPeriod = {
            "period": "2023-10-17T17:00:00.000Z",
            "status": PeriodStatusEnum.OPEN,
            "title": "Năm 2023 - Đợt 2",
            "year": "2023"
        }

        test('should response same with expected', async () => {
            const response = await request.post(`${PERIOD_URL}`)
                                    .set('Authorization', SECRETARY_TOKEN)
                                    .send({period: newPeriod});
            expect(response.body.period).toMatchObject(newPeriod);
        })

        test('should create new period in database', async () => {
            const response = await request.post(`${PERIOD_URL}`)
                                    .set('Authorization', SECRETARY_TOKEN)
                                    .send({period: newPeriod});
            const existedPeriod = await PeriodModel.findById(response.body.period?._id).lean();
            existedPeriod.period = (existedPeriod.period).toISOString();
            expect(existedPeriod).toMatchObject(newPeriod);
        })
    })

    describe('get list period', () => {
        beforeAll(async () => {
            await initPeriodColection();
        })

        test('filter by year', async () => {
            const response = await request.get(`${PERIOD_URL}?year=2022`);
            const periodsList: periodInterface[] = response.body.periods;
            const periodsId = periodsList.map((period) => period._id);
            const expected = ["63efa36a1c711759b6a7b10a", "63efa36a1c711759b6a7a088"]
            expect(periodsId).toEqual(expected)
        })

        test('filter by year and status', async () => {
            const response = await request.get(`${PERIOD_URL}?year=2022&status=${encodeURI(PeriodStatusEnum.CLOSE)}`);
            const periodsList: periodInterface[] = response.body.periods;
            const periodsId = periodsList.map((period) => period._id);
            const expected = ["63efa36a1c711759b6a7a088"]
            expect(periodsId).toEqual(expected)
        })
    })

    describe('update period status', () => {
        beforeEach(async () => {
            await initPeriodColection();
        })

        test('open period', async () => {
            const response = await request.put(`${PERIOD_URL}/63efa36a1c711759b6a7a088`)
                                    .set('Authorization', SECRETARY_TOKEN)
                                    .send({period: {
                                        status: PeriodStatusEnum.OPEN
                                    }});
            const periodInDb = await PeriodModel.findById('63efa36a1c711759b6a7a088').lean();
            expect(periodInDb.status).toBe(PeriodStatusEnum.OPEN)
        })

        test('close period', async () => {
            const response = await request.put(`${PERIOD_URL}/63efa36a1c711759b6a7b10a`)
                                    .set('Authorization', SECRETARY_TOKEN)
                                    .send({period: {
                                        status: PeriodStatusEnum.CLOSE
                                    }});
            const periodInDb = await PeriodModel.findById('63efa36a1c711759b6a7b10a').lean();
            expect(periodInDb.status).toBe(PeriodStatusEnum.CLOSE)
        })
    })
})