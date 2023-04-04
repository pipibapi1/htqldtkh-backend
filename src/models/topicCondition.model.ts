import mongoose from 'mongoose';
import { TopicTypeEnum } from '../enums/topicType.enum';
import { InstructorConditionApproveWayEnum } from '../enums/instructorConditionApproveWay.enum';
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
    }
    // instructorDegreeCondition: {
    //     type: [String],
    //     default: []
    // },
    // instructorAcademyRankCondition: {
    //     type: [String],
    //     default: []
    // },
    // instructorConditionApproveWay: {
    //     type: String,
    //     enum: Object.values(InstructorConditionApproveWayEnum)
    // }
}, {collection: "topicCondition"})

let topicConditionModel = mongoose.model("topicCondition", topicConditionSchema);

module.exports = topicConditionModel