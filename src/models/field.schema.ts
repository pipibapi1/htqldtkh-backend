import mongoose from "mongoose";
import { DataTypeEnum } from "../enums/dataType.enum";
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
    initialName: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    note: {
        type: String, 
        require: false
    },
    dataType: {
        type: String,
        enum: Object.values(DataTypeEnum),
        require: true
    },
})

module.exports = {
    fieldSchema,
}