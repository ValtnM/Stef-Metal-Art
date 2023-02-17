const mongoose = require('mongoose');

const peintureSchema = new mongoose.Schema({
    _id: {type: Object, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    thumbnail: {type: String, required: true},
    photo: {type: String, required: true},
    instagram: {type: Boolean, required: true},
    like: {type: Number, required: true},
})

module.exports = mongoose.model('peintures', peintureSchema)
export {}