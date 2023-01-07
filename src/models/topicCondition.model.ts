import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
const Schema = mongoose.Schema;

const topicConditionSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: Object.values(TopicTypeEnum),
        require: true
    },
    expressionId: {
        type: String,
        require: true
    }
}, {collection: "topicCondition"})

let topicConditionModel = mongoose.model("topicCondition", topicConditionSchema);

module.exports = topicConditionModel