import mongoose from 'mongoose';
import { CouncilTypeEnum } from '../enums/councilType.enum';
import { CouncilStatusEnum } from '../enums/councilStatus.enum';
const Schema = mongoose.Schema;
const CouncilMemberSchema = require('./councilMember.schema');

const councilSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: CouncilStatusEnum.NEW,
        enum: Object.values(CouncilStatusEnum)
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
    date: {
        type: String,
        default: ""
    },
    place: {
        type: String,
        default: ""
    },
    members: {
        type: [Object],
        default: []
    },
    numMembers: {
        type: Number,
        default: 0
    },
    numTopics: {
        type: Number,
        default: 0
    }, 
    lastModified: {
        type: String,
        require: true
    }
}, {collection: 'council'})

let councilModel = mongoose.model('council', councilSchema);

module.exports = councilModel