"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Sculpture = require("../models/Sculpture.js");
const Peinture = require("../models/Peinture.js");
exports.getAllSculpture = (req, res, next) => {
    Sculpture.find()
        .then((sculptures) => res.status(200).json(sculptures))
        .catch((err) => res.status(400).json({ err }));
};
exports.getAllPeinture = (req, res, next) => {
    Peinture.find()
        .then((peintures) => res.status(200).json(peintures))
        .catch((err) => res.status(400).json({ err }));
};
exports.getOneSculpture = (req, res, next) => {
    Sculpture.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then((sculpture) => {
        res.status(200).json(sculpture);
    })
        .catch(() => res.status(404).json({ erreur: "Sculpture introuvable !" }));
};
exports.getOnePeinture = (req, res, next) => {
    Peinture.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then((peinture) => {
        res.status(200).json(peinture);
    })
        .catch(() => res.status(404).json({ erreur: "Peinture introuvable !" }));
};
