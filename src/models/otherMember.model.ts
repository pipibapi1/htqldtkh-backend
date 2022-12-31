import mongoose from 'mongoose';
import { GenderTypeEnum } from '../enums/genderType.enum';
import { EducationTypeEnum } from '../enums/educationType.enum';
const Schema = mongoose.Schema;

const otherMemberSchema = new Schema({
    topicId: {
        type: String,
        require: true
    },
    studentId: {
        type: String,
        require: true
    },
    fmName: {
        type: String,
        require: true,
        min: 1
    },
    name: {
        type: String,
        require: true,
        min: 1
    },
    gender: {
        type: GenderTypeEnum,
        require: true,
    },
    email: {
        type: String,
        require: true,
        min: 1
    },
    phoneNumber: {
        type: String,
        require: true,
        min: 1
    },
    educationType: {
        type: EducationTypeEnum,
        require: true,
    },
    birthDate: {
        type: Date,
        require: true
    }
})

let otherMemberModel = mongoose.model('student', otherMemberSchema);

module.exports = {
    otherMemberModel,
}