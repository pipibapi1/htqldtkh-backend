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
})

let annoucementModel = mongoose.model("annoucements", annoucementSchema);

module.exports = {
    annoucementModel,
}