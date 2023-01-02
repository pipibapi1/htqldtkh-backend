import mongoose from "mongoose";
import { GenderTypeEnum } from "../enums/genderType.enum";
const Schema = mongoose.Schema;

const facultyViceDeanSchema = new Schema({
    fmName: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    gender: {
        type: GenderTypeEnum,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: false
    },
    userName: {
        type: String,
        require: true,
        min: 6,
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    image: {
        type: String,
        require: true
    },
    staffId: {
        type: String,
        require: true
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

let facultyViceDeanModel = mongoose.model("facultyViceDean", facultyViceDeanSchema);

module.exports={
    facultyViceDeanModel,
}