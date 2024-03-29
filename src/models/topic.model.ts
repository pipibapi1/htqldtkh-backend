import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
import { TopicStatusEnum } from '../enums/topicStatus.enum';
import { TopicResultEnum } from '../enums/topicResult.enum';
import { string } from 'zod';
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
        type: String,
        require: false
    },
    endTime: {
        type: String,
        require: false
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
    productId: {
        type: String,
        require: false
    },
    studentId: {
        type: String,
        require: true
    },
    acceptanceCouncilId: {
        type: String,
        default: ""
    },
    reviewCouncilId: {
        type: String,
        default: ""
    },
    creationDate: {
        type: Date,
        require: true,
        index: -1
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
    instructors: {
        type: [Object],
        default: []
    },
    otherMembers: {
        type: [Object],
        default: []
    },
    topicGivenId: {
        type: String,
        min: 1
    }
}, { collection: 'topic' })
topicSchema.index({ name: 'text', topicGivenId: 'text' });
let topicModel = mongoose.model('topic', topicSchema);

module.exports = topicModel