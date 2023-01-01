import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paperTemplateSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    templateFile: {
        type: File,
        require: false
    },
    forStudent: {
        type: Boolean,
        default: true
    },
    formId: {
        type: String,
        require: true
    },
    relevantPapersId: {
        type: String,
        require: true
    }
})

let paperTemplateModel = mongoose.model("paperTemplate", paperTemplateSchema);

module.exports = {
    paperTemplateModel,
}