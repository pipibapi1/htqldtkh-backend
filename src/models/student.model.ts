import mongoose from 'mongoose';
import { EducationTypeEnum } from '../enums/educationType.enum';
import { GenderTypeEnum } from '../enums/genderType.enum';
import { RoleTypeEnum } from '../enums/roleType.enum';
import { StudentAccountStatusEnum } from '../enums/studentAccountStatus.enum';
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: {type: String},
    fmName: {type: String},
    name: {type: String},
    gender: {type: GenderTypeEnum},
    phoneNumber: {type: String},
    email: {type: String},
    role: {type: RoleTypeEnum},
    username: {type: String},
    password: {type: String},
    image: {type: String},
    studentId: {type: String},
    educationType: {type: EducationTypeEnum},
    accountStatus: {type: StudentAccountStatusEnum},
    accountCreationDate: {type: Date},
    birthDate: {type: Date}
})

let studentModel = mongoose.model('student', studentSchema);

module.exports = {
    studentModel,
}