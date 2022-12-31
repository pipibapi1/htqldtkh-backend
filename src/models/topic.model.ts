import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.num';
import { TopicStatusEnum } from '../enums/topicStatus.enum';
import { TopicResultEnum } from '../enums/topicResult.enum';
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: {
        type: String,
        min: 1
    },
    type: {
        type: TopicTypeEnum,
        require: true
    },
    startTime: {
        type: Date,
        require: true
    },
    endTime: {
        type: Date,
        require: true
    },
    isExtended: {
        type: Boolean,
        defaut: false
    },
    extensionTime: {
        type: Number,
        defaut: 0
    },
    expense: {
        type: Number,
        defaut: false
    },
    status: {
        type: TopicStatusEnum,
        defaut: false
    },
    period: {
        type: Date,
        require: true
    },
    product: {
        type: File,
        require: false
    },
    studentId: {
        type: String,
        require: true
    },
    acceptanceCouncilId: {
        type: String,
        require: false
    },
    reviewCouncilId: {
        type: String,
        require: false
    },
    creationDate: {
        type: Date,
        require: true
    },
    acceptanceResult: {
        type: TopicResultEnum,
        default: TopicResultEnum.WAITING
    },
    reviewResult: {
        type: TopicResultEnum,
        default: TopicResultEnum.WAITING
    },
})

let topicModel = mongoose.model('student', topicSchema);

module.exports = {
    topicModel,
}