const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: false,
        nullable: true
    }
})

module.exports = expenseSchema