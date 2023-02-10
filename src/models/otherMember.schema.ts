import mongoose from 'mongoose';
import { GenderTypeEnum } from '../enums/genderType.enum';
import { EducationTypeEnum } from '../enums/educationType.enum';
const Schema = mongoose.Schema;

const otherMemberSchema = new Schema({
    studentId: {
        type: String,
        require: true
    },
    fmName: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require: true,
        min: 1
    },
    gender: {
        type: String,
        enum: Object.values(GenderTypeEnum),
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
        type: String,
        enum: Object.values(EducationTypeEnum),
        require: true,
    },
    birthDate: {
        type: String,
        require: true
    }
})

module.exports = {
    otherMemberSchema,
}