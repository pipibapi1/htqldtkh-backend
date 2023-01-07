import mongoose from 'mongoose';
import { OperatorTypeEnum } from '../enums/operator.enum';
const Schema = mongoose.Schema;

const variableSchema = new Schema({
    variable: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
})

const expressionSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    operator: {
        type: String,
        enum: Object.values(OperatorTypeEnum),
        require: true
    },
    leftConditionId: {
        type: String, 
        require: false
    },
    rightConditionId: {
        type: String, 
        require: false
    },
    leftExpr: {
        type: [variableSchema],
        default: []
    },
    rightValue: {
        type: String,
        require: true
    }
})

let expressionModel = mongoose.model("expressions", expressionSchema);

module.exports = {
    expressionModel,
}