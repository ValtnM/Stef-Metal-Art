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
    if (mongoose.connection.readyState === 1) {
        Link.find((err, link) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                console.log(link);
                res.status(200).json(link);
            }
        });
    }
    else {
        res.status(400).json({ error: "Database not connected" });
    }
};
exports.addLink = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const name = req.body.name;
    const file = req.file;
    const link = req.body.link;
    if (!file) {
        res.status(400).json({ error: "Aucune vignette d'ajoutée" });
    }
    else if (!name) {
        deleteThumbnailFile(file.filename);
        res.status(400).json({ error: "Aucun nom d'indiqué" });
    }
    else if (!link) {
        deleteThumbnailFile(file.filename);
        res.status(400).json({ error: "Aucun lien d'indiqué" });
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
exports.deleteLinkById = (req, res) => {
    const linkId = mongoose.Types.ObjectId(req.params.linkId);
    Link.findById(linkId, (err, link) => {
        if (err) {
            console.log(err);
        }
        else {
            const thumbnail = link.thumbnail;
            Link.deleteOne({ _id: link._id }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    fs.unlink(`dist/images/${thumbnail}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(`${thumbnail} was deleted`);
                        }
                    });
                    res.status(200).json({ message: "La lien a bien été supprimé" });
                }
            });
        }
    });
};
