import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
const Schema = mongoose.Schema;



const topicConditionSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(TopicTypeEnum),
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    expression: {
        type: Object,
        default: {}
    },
    leaderCondition: {
        type: [String],
        default: []
    }
}, {collection: "topicCondition"})

let topicConditionModel = mongoose.model("topicCondition", topicConditionSchema);

module.exports = topicConditionModel