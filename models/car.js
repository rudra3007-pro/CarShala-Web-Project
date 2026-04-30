const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    carName: { type: String, required: true, trim: true },
    price:   { type: Number, required: true },
    seater:  { type: Number }
}, { timestamps: true })

module.exports = mongoose.models.Car || mongoose.model('Car', carSchema)