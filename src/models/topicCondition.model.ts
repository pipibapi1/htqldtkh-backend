import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
import { InstructorConditionApproveWayEnum } from '../enums/instructorConditionApproveWay.enum';
import { ConditionRequireLevelEnum } from '../enums/conditionRequireDegree.enum';
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
    },
    instructorCondition: {
        type: {
            degree: {
                type: [String],
                default: []
            },
            academyRank: {
                type: [String],
                default: []
            },
            approveWay: {
                type: String,
                enum: Object.values(InstructorConditionApproveWayEnum),
                default: InstructorConditionApproveWayEnum.ALL
            }
        }
    },
    requireLevel: {
        type: String,
        default: ConditionRequireLevelEnum.REQUIRED,
        enum: Object.values(ConditionRequireLevelEnum)
    }
}, {collection: "topicCondition"})

let topicConditionModel = mongoose.model("topicCondition", topicConditionSchema);

module.exports = topicConditionModel