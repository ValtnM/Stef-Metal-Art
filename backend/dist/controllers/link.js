"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const fs = require("fs");
const Link = require("../models/Link");
const deleteThumbnailFile = (filename) => {
    fs.unlink(`dist/images/${filename}`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`${filename} was deleted`);
        }
    });
};
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
exports.addLink = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const name = req.body.name;
    const file = req.file;
    const link = req.body.link;
    if (!file) {
        res.status(400).json({ error: "Aucune vignette d'ajouter" });
    }
    else if (!name) {
        deleteThumbnailFile(file.filename);
        res.status(400).json({ error: "Aucun nom d'indiquer" });
    }
    else if (!link) {
        deleteThumbnailFile(file.filename);
        res.status(400).json({ error: "Aucun lien d'indiquer" });
    }
    else {
        Link.create({
            _id: mongoose.Types.ObjectId(),
            name,
            thumbnail: file.filename,
            link,
            create_date: Date.now(),
            update_date: Date.now(),
        }, (err) => {
            if (err) {
                deleteThumbnailFile(file.filename);
                res.status(400).json(err);
            }
            else {
                res.status(200).json({ message: "Nouveau lien ajouté" });
            }
        });
    }
};
