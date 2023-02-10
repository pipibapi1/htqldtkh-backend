import mongoose from 'mongoose';
import { GenderTypeEnum } from '../enums/genderType.enum';
import { AcademyRankEnum } from '../enums/academyRank.enum';
import { DegreeEnum } from '../enums/degree.enum';
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    staffId: {
        type: String,
        require: true,
        min: 1
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
        type: String,
        enum: Object.values(GenderTypeEnum),
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    birthDate: {
        type: String,
        require: true,
    },
    academyRank: {
        type: String,
        enum: Object.values(AcademyRankEnum),
        require: true
    },
    degree: {
        type: String,
        enum: Object.values(DegreeEnum),
        require: true,
    },
}, {collection: 'instructor'})

let instructorModel = mongoose.model('instructor', instructorSchema);

module.exports = instructorModel