import mongoose from "mongoose";
import { GenderTypeEnum } from "../enums/genderType.enum";
const Schema = mongoose.Schema;

const facultyViceDeanSchema = new Schema({
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
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: false
    },
    username: {
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
    rawPassword: {
        type: String,
        require: true,
        min: 1
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
        require: true,
        index: -1
    },
    birthDate: {
        type: String,
        require: true
    },
    notifications: {
        default: [],
        type: [{
            author: {
                type: String,
                require: true
            },
            subject: {
                type: String,
                require: true
            },
            content: {
                type: String,
                require: false
            },
            createAt: {
                type: Date,
                require: true
            },
            redirect: {
                type: String,
                require: false
            },
            isRead: {
                type: Boolean,
                default: false
            }
        }]
    },
    numNotification: {
        type: Number,
        default: 0
    }
}, {collection: "facultyViceDean"})

let facultyViceDeanModel = mongoose.model("facultyViceDean", facultyViceDeanSchema);

module.exports=facultyViceDeanModel