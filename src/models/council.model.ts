import mongoose from 'mongoose';
import { CouncilTypeEnum } from '../enums/councilType.enum';
const Schema = mongoose.Schema;
const CouncilMemberSchema = require('./councilMember.schema');

const councilSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: Object.values(CouncilTypeEnum),
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

let councilModel = mongoose.model('council', councilSchema);

module.exports = {
    councilModel,
}