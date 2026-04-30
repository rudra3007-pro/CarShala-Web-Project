const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    licence:  { type: String, required: true },
    age:      { type: Number, required: true },
    owner:    { type: String, required: true }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)