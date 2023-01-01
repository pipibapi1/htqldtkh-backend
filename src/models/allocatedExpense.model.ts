import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const allocatedExpenseSchema = new Schema({

});

let allocatedExpenseModel = mongoose.model("allocatedExpense", allocatedExpenseSchema);

module.exports = {
    allocatedExpenseModel,
}