import mongoose from 'mongoose';
import { GenderTypeEnum } from '../enums/genderType.enum';
import { AcademyRankEnum } from '../enums/academyRank.enum';
import { DegreeEnum } from '../enums/degree.enum';
import { CouncilRoleEnum } from '../enums/councilRole.enum';
const Schema = mongoose.Schema;

const councilMemberSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    fmName: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: Object.values(GenderTypeEnum),
        require: true
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    academyRank: {
        type: String,
        enum: Object.values(AcademyRankEnum),
        require: false
    },
    degree: {
        type: DegreeEnum,
        require: false
    },
    workUnit: {
        type: String,
        require: false
    },
    role: {
        type: String,
        enum: Object.values(CouncilRoleEnum),
        require: true
    }
})

module.exports = {
    councilMemberSchema,
}