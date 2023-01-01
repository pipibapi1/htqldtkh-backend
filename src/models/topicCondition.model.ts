import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
const Schema = mongoose.Schema;

const topicConditionSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    type: {
        type: TopicTypeEnum,
        require: true
    },
    expressionId: {
        type: String,
        require: true
    }
})

let topicConditionModel = mongoose.model("topicCondition", topicConditionSchema);

module.exports = {
    topicConditionModel,
}