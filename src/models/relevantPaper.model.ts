import mongoose, { Collection } from 'mongoose';
const Schema = mongoose.Schema;

const relevantPaperSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    paperFile: {
        type: File,
        require: false
    },
    forStudent: {
        type: Boolean,
        default: true
    },
    topicId: {
        type: String,
        require: true
    },
    templateId: {
        type: String,
        require: true
    },
    modifiedAt: {
        type: Date,
        require: true,
        index: -1
    }
}, {collection: "relevantPaper"})

let relevantPaperModel = mongoose.model("relevantPaper", relevantPaperSchema);

module.exports = relevantPaperModel