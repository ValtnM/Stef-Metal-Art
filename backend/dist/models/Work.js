"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const workSchema = new mongoose.Schema({
    _id: { type: Object, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true },
    photos: { type: Array, required: true },
    instagram: { type: Boolean, required: true },
    like: { type: Number, required: true },
    create_date: { type: Date, required: false },
    update_date: { type: Date, required: false },
});
const Sculptures = mongoose.model('sculptures', workSchema);
const Paintings = mongoose.model('paintings', workSchema);
module.exports = {
    Sculptures,
    Paintings
};
