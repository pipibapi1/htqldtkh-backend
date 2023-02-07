import mongoose from 'mongoose';
import { GenderTypeEnum } from '../enums/genderType.enum';

const Schema = mongoose.Schema;

const staffSchema = new Schema({
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
    staffId: {
        type: String,
        require: true,
        min: 1,
    },
    birthDate: {
        type: String,
        require: true
    }
}, {collection: "staff"})

let staffModel = mongoose.model('staff', staffSchema);

module.exports = staffModel