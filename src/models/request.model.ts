import mongoose from 'mongoose';
import { RequestTypeEnum } from '../enums/requestType.enum';
import { RequestStatusEnum } from '../enums/requestStatus.enum';
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    status: {
        type: String,
        enum: Object.values(RequestStatusEnum),
        require: true
    },
    type: {
        type: String,
        enum: Object.values(RequestTypeEnum),
        require: true
    },
    studentId: {
        type: String,
        require: true
    },
    topicId: {
        type: String,
        require: true
    },
    extensionTime: {
        type: Number,
        defaut: 0,
        require: false
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    period: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
}, {collection: "request"})

let requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel