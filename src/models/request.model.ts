import mongoose from 'mongoose';
import { RequestTypeEnum } from '../enums/requestType.enum';
import { RequestStatusEnum } from '../enums/requestStatus.enum';
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    status: {
        type: RequestStatusEnum,
        require: true
    },
    type: {
        type: RequestTypeEnum,
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
})

let requestModel = mongoose.model("request", requestSchema);

module.exports = {
    requestModel,
}