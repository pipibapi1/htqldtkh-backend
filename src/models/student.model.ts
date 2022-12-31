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
    fmName: {
        type: String,
        require: true,
        min: 1
    },
    name: {
        type: String,
        min: 1
    },
    gender: {
        type: GenderTypeEnum,
        require: true
    },
    phoneNumber: {
        type: String,
        min: 9,
        max: 13
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: RoleTypeEnum,
        default: "sinh viên"
    },
    username: {
        type: String,
        require: true,
        min: 1,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 30
    },
    image: {
        type: String,
        require: false
    },
    studentId: {
        type: String,
        require: true,
        min: 1
    },
    educationType: {
        type: EducationTypeEnum,
        require: true
    },
    accountStatus: {
        type: StudentAccountStatusEnum,
        default: "chờ duyệt"
    },
    accountCreationDate: {
        type: Date,
        require: true
    },
    birthDate: {
        type: Date,
        require: true
    }
})

let studentModel = mongoose.model('student', studentSchema);

module.exports = {
    studentModel,
}