import mongoose, { Collection } from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        index: -1
    },
    productAttachedFile: {
        type: String,
        require: true
    },
    productFileType: {
        type: String,
        require: true
    },
    productFileName: {
        type: String,
        require: true
    },
    topicId: {
        type: String,
        require: true
    },
    modifiedAt: {
        type: Date,
        require: true,
        index: -1
    }
}, {collection: "product"})

let productModel = mongoose.model("product", productSchema);

module.exports = productModel