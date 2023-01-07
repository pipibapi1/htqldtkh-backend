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
        require: true
    },
    attachedFile: {
        type: File,
        require: true
    }
}, {collection: "annoucement"})

let annoucementModel = mongoose.model("annoucement", annoucementSchema);

module.exports = annoucementModel