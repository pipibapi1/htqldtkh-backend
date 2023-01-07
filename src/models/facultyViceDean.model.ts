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
        type: String,
        enum: Object.values(GenderTypeEnum),
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
        unique: true
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
        type: String,
        require: true
    }
}, {collection: "facultyViceDean"})

let facultyViceDeanModel = mongoose.model("facultyViceDean", facultyViceDeanSchema);

module.exports=facultyViceDeanModel