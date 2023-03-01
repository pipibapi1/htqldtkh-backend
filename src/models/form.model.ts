import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const FieldSchema = require('./field.schema')

const formSchema = new Schema({
    markedTemplateAttachedFile: {
        type: String,
        require: true
    },
    markedTemplateFileType: {
        type: String,
        require: true
    },
    markedTemplateFileName: {
        type: String,
        require: true
    },
    templateId: {
        type: String,
        require: true
    },
    fields: { 
        type: [Object],
        default: []
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    }
}, {collection: 'form'})

let formModel = mongoose.model('form', formSchema);

module.exports = formModel