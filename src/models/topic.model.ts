import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
import { TopicStatusEnum } from '../enums/topicStatus.enum';
import { TopicResultEnum } from '../enums/topicResult.enum';
const Schema = mongoose.Schema;
const otherMemberSchema = require('./otherMember.schema');

const topicSchema = new Schema({
    name: {
        type: String,
        min: 1
    },
    type: {
        type: String,
        enum: Object.values(TopicTypeEnum),
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
        defaut: 0
    },
    status: {
        type: String,
        enum: Object.values(TopicStatusEnum),
        defaut: false
    },
    period: {
        type: String,
        require: true
    },
    productPath: {
        type: String,
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
        type: String,
        enum: Object.values(TopicResultEnum),
        default: TopicResultEnum.WAITING
    },
    reviewResult: {
        type: String,
        enum: Object.values(TopicResultEnum),
        default: TopicResultEnum.WAITING
    },
    instructorsId: {
        type: [String],
        default: []
    },
    otherMembers: {
        type: [otherMemberSchema],
        default: []
    }
}, {collection: 'topic'})

let topicModel = mongoose.model('topic', topicSchema);

module.exports = topicModel