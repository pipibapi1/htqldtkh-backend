import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const FieldSchema = require('./field.schema')

const formSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    markedTemplateFile: {
        type: File,
        require: true
    },
    templateId: {
        type: String,
        require: true
    },
    fields: {
        type: [FieldSchema],
        default: []
    }
})

let formModel = mongoose.model('forms', formSchema);

module.exports = {
    formModel,
}