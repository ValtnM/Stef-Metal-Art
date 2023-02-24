"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const fs = require("fs");
const { Sculptures } = require("../models/Oeuvre.js");
const { Peintures } = require("../models/Oeuvre.js");
const selectModel = (type) => {
    if (type === "sculpture") {
        return Sculptures;
    }
    else if (type === "peinture") {
        return Peintures;
    }
};
exports.getOeuvreByType = (req, res) => {
    selectModel(req.params.type).find({ type: req.params.type })
        .then((oeuvres) => res.status(200).json(oeuvres))
        .catch((err) => res.status(400).json({ err }));
};
exports.getSculptureById = (req, res) => {
    Sculptures.findById(mongoose.Types.ObjectId(req.params.id))
        .then((sculpture) => {
        res.status(200).json(sculpture);
    })
        .catch(() => res.status(404).json({ erreur: "Sculpture introuvable !" }));
};
exports.getPeintureById = (req, res) => {
    Peintures.findById(mongoose.Types.ObjectId(req.params.id))
        .then((peinture) => {
        res.status(200).json(peinture);
    })
        .catch(() => res.status(404).json({ erreur: "Peinture introuvable !" }));
};
exports.addNewPost = (req, res) => {
    const thumbnail = req.files.thumbnail;
    const photosArray = req.files.photos;
    const deleteThumbnail = () => {
        if (thumbnail) {
            fs.unlink(`dist/images/${thumbnail[0].filename}`, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Thumbnail deleted !");
                }
            });
        }
    };
    const deletePhotos = () => {
        if (photosArray) {
            for (let i = 0; i < photosArray.length; i++)
                fs.unlink(`dist/images/${photosArray[i].filename}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Photo deleted !");
                    }
                });
        }
    };
    if (!thumbnail) {
        deletePhotos();
        res.status(400).json({ erreur: "Aucune vignette n'a été selectionnée" });
    }
    else if (!photosArray) {
        deleteThumbnail();
        res.status(400).json({ erreur: "Aucune photo n'a été selectionnée" });
    }
    else if (!req.body.name) {
        deleteThumbnail();
        deletePhotos();
        res.status(400).json({ erreur: "Aucun nom n'a été saisi" });
    }
    else if (!req.body.type) {
        deleteThumbnail();
        deletePhotos();
        res.status(400).json({ erreur: "Aucun type n'a été indiqué" });
    }
    else {
        let photoNamesArray = [];
        for (let i = 0; i < photosArray.length; i++) {
            photoNamesArray.push(photosArray[i].filename);
        }
        selectModel(req.body.type).create({
            _id: mongoose.Types.ObjectId(),
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            thumbnail: thumbnail[0].filename,
            photos: photoNamesArray,
            instagram: req.body.instagram,
            like: 0,
            create_date: Date.now(),
            update_date: Date.now(),
        }, (err) => {
            if (err) {
                deleteThumbnail();
                deletePhotos();
                res.status(400).json(err);
            }
            else {
                res.status(200).json({ message: "L'œuvre a été ajoutée" });
            }
        });
    }
};
