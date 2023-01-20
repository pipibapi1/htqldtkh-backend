import mongoose from 'mongoose';
import { EducationTypeEnum } from '../enums/educationType.enum';
import { GenderTypeEnum } from '../enums/genderType.enum';
import { RoleTypeEnum } from '../enums/roleType.enum';
import { StudentAccountStatusEnum } from '../enums/studentAccountStatus.enum';
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    lastModifiedAt: {
        type: Date,
        require: true
    },
    name: {
        type: String,
        require: true,
        min: 1
    },
    gender: {
        type: String,
        enum: Object.values(GenderTypeEnum),
        require: true
    },
    phoneNumber: {
        type: String,
        require: false,
        min: 9,
        max: 13
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: Object.values(RoleTypeEnum),
        default: RoleTypeEnum.Student
    },
    username: {
        type: String,
        require: true,
        min: 1,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 1,
    },
    image: {
        type: String,
        require: false
    },
    studentId: {
        type: String,
        require: true,
        min: 1,
    },
    educationType: {
        type: String,
        enum: Object.values(EducationTypeEnum),
        require: true
    },
    accountStatus: {
        type: String,
        enum: Object.values(StudentAccountStatusEnum),
        default: StudentAccountStatusEnum.waiting
    },
    accountCreationDate: {
        type: Date,
        require: true
    },
    birthDate: {
        type: String,
        require: true
    }
}, {collection: "student"})

let studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel