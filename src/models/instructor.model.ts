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
        type: GenderTypeEnum,
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
        type: Date,
        require: true,
    },
    academyRank: {
        type: AcademyRankEnum,
        require: true
    },
    degree: {
        type: DegreeEnum,
        require: true,
    },
})

let instructorModel = mongoose.model('instructor', instructorSchema);

module.exports = {
    instructorModel,
}