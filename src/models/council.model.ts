import mongoose from 'mongoose';
import { CouncilTypeEnum } from '../enums/councilType.enum';
const Schema = mongoose.Schema;
const CouncilMemberSchema = require('./councilMember.schema');

const topicSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: CouncilTypeEnum,
        require: true
    },
    period: {
        type: String,
        require: true
    },
    time: {
        type: String,
        default: ""
    },
    place: {
        type: String,
        default: ""
    },
    members: {
        type: [CouncilMemberSchema],
        default: []
    },
    numMembers: {
        type: Number,
        default: 0
    },
    topics: {
        type: [String],
        default: []
    },
    numTopics: {
        type: Number,
        default: 0
    }
})

let topicModel = mongoose.model('council', topicSchema);

module.exports = {
    topicModel,
}