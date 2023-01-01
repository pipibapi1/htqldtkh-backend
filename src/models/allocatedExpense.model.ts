import mongoose from 'mongoose';
import { AllocatedExpenseTypeEnum } from '../enums/allocatedExpenseType.enum';

const Schema = mongoose.Schema;

const allocatedExpenseSchema = new Schema({
    faculity: {
        type: String,
        require: true
    },
    expense : {
        type: [{
            type: {
                type: AllocatedExpenseTypeEnum,
                require: true
            },
            totalExpense: {
                type: Number,
                require: false
            },
            usedExpense: {
                type: Number,
                default: 0
            },
            maxExpensePerTopic: {
                type: Number,
                require: false
            },
        }],
        default: []
    }
});

let allocatedExpenseModel = mongoose.model("allocatedExpense", allocatedExpenseSchema);

module.exports = {
    allocatedExpenseModel,
}