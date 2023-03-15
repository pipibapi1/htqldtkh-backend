import mongoose, { Collection } from "mongoose";
import { GenderTypeEnum } from "../enums/genderType.enum";
const Schema = mongoose.Schema;

const facultySecretarySchema = new Schema({
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
    staffId: {
        type: String,
        require: true
    },
    accountCreationDate: {
        type: Date,
        require: false
    },
    birthDate: {
        type: String,
        require: true
    },
    image: {
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
            }
        }]
    },
    numNotification: {
        type: Number,
        default: 0
    }
}, {
    collection: "facultySecretary"
})

let facultySecretaryModel = mongoose.model("facultySecretary", facultySecretarySchema);

module.exports = facultySecretaryModel