"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({
    _id: { type: Object, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    link: { type: String, required: true },
    create_date: { type: Date, required: false },
    update_date: { type: Date, required: false },
});
module.exports = mongoose.model("Link", linkSchema);
