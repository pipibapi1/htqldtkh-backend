import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const initExpense = [
    {
        "_id": new ObjectId("63f24730553d2ff87ce8b38f"),
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
]

export const initAllocatedExpenseColection =async () => {
    try {
        const connection = mongoose.connection;
        const allocatedExpenseCollection = connection.collection('allocatedExpense');
        await allocatedExpenseCollection.drop();
        await allocatedExpenseCollection.insertMany(initExpense);
    } catch (error) {
        console.log('Init allocated expense fail')
    }    
}