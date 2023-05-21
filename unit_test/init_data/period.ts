import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { PeriodStatusEnum } from "../../src/enums/periodStatus.enum";

const initPeriod = [
    {
        "_id": new ObjectId("63efa36a1c711759b6a7e463"),
        "period": new Date("2023-04-30T17:00:00.000Z"),
        "status": PeriodStatusEnum.OPEN,
        "createAt": new Date("2022-10-17T15:55:22.398Z"),
        "title": "Năm 2023 - Đợt 1",
        "year": "2023",
    },
    {
        "_id": new ObjectId("63efa36a1c711759b6a7b10a"),
        "period": new Date("2022-10-31T17:00:00.000Z"),
        "status": PeriodStatusEnum.OPEN,
        "createAt": new Date("2022-02-17T15:55:22.398Z"),
        "title": "Năm 2022 - Đợt 2",
        "year": "2022",
    },
    {
        "_id": new ObjectId("63efa36a1c711759b6a7a088"),
        "period": new Date("2022-04-30T17:00:00.000Z"),
        "status": PeriodStatusEnum.CLOSE,
        "createAt": new Date("2021-10-17T15:55:22.398Z"),
        "title": "Năm 2022 - Đợt 1",
        "year": "2022",
    }
]

export const initPeriodColection =async () => {
    try {
        const connection = mongoose.connection;
        const periodCollection = connection.collection('period');
        await periodCollection.drop();
        await periodCollection.insertMany(initPeriod);
    } catch (error) {
        console.log('Init allocated expense fail')
    }    
}