import mongoose from 'mongoose';
import { PeriodStatusEnum } from '../enums/periodStatus.enum';
const Schema = mongoose.Schema;

const registerPeriodSchema = new Schema({
    period:{
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: Object.values(PeriodStatusEnum),
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    }
}, {collection: "registerPeriod"})

let requestModel = mongoose.model("registerPeriod", registerPeriodSchema);

module.exports = requestModel