const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    nameClient: {type: String, required: true},
    phoneClient: {type: Number, required: true}
})

module.exports = mongoose.model('Client', ClientSchema)