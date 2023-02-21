import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const FieldSchema = require('./field.schema')

const formSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    markedTemplateFile: {
        type: String,
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
}, {collection: 'form'})

let formModel = mongoose.model('form', formSchema);

module.exports = formModel