import mongoose from "mongoose";
const Schema = mongoose.Schema;

const annoucementSchema = new Schema({
    title: {
        type: String, 
        require: true
    },
    content: {
        type: String, 
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    attachedFile: {
        type: String,
        require: true
    },
    fileType: {
        type: String,
        require: true
    },
    fileName: {
        type: String,
        require: true
    },
    period: {
        type: String,
        require: true
    }
}, {collection: "announcement"})

let annoucementModel = mongoose.model("announcement", annoucementSchema);

module.exports = annoucementModel