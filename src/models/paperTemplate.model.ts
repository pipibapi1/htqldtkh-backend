import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paperTemplateSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    templateGivenId: {
        type: String,
        require: true
    },
    name: {
        type: String, 
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    templateAttachedFile: {
        type: String,
        require: true
    },
    templateFileType: {
        type: String,
        require: true
    },
    templateFileName: {
        type: String,
        require: true
    },
    forStudent: {
        type: Boolean,
        default: true
    },
    formId: {
        type: String,
        require: true
    },
    inUse: {
        type: Boolean,
        require: true
    }
}, {collection: "paperTemplate"})

let paperTemplateModel = mongoose.model("paperTemplate", paperTemplateSchema);

module.exports = paperTemplateModel