import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';

const Schema = mongoose.Schema;

const allocatedExpenseSchema = new Schema({
    period: {
        type: String,
        require: true,
        index: {unique: true}
    },
    lastModified: {
        type: Date,
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    allocated : {
        type: [{
            type: {
                type: String,
                enum: Object.values(TopicTypeEnum),
                require: true
            },
            totalExpense: {
                type: Number,
                require: false,
                min: 0
            },
            maxExpensePerTopic: {
                type: Number,
                require: false,
                min: 0
            }
        }],
        default: []
    },
    totalExpense: {
        type: Number,
        require: true,
        min: 0
    },
    generalExpense: {
        type: Number,
        default: 0,
        min: 0
    },
    note: {
        type: String,
        require: false
    }
}, {collection: "allocatedExpense"});

let allocatedExpenseModel = mongoose.model("allocatedExpense", allocatedExpenseSchema);

module.exports = allocatedExpenseModel