"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const peintureSchema = new mongoose.Schema({
    _id: { type: Object, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true },
    photo: { type: String, required: true },
    instagram: { type: Boolean, required: true },
    like: { type: Number, required: true },
    create_date: { type: Date, required: true },
    update_date: { type: Date, required: true },
});
module.exports = mongoose.model('peintures', peintureSchema);
