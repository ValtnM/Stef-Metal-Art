"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Link = require('../models/Link');
exports.getAllLinks = (req, res) => {
    Link.find((err, link) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            console.log(link);
            res.status(200).json(link);
        }
    });
};
