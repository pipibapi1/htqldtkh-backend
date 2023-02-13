import mongoose, { Collection } from 'mongoose';
const Schema = mongoose.Schema;

const relevantPaperSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    paperAttachedFile: {
        type: String,
        require: true
    },
    paperFileType: {
        type: String,
        require: true
    },
    paperFileName: {
        type: String,
        require: true
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