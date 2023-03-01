"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const fs = require("fs");
const { Sculptures } = require("../models/Work.js");
const { Paintings } = require("../models/Work.js");
// Selection d'un modèle en fonction du type d'œuvre
const selectModel = (type) => {
    if (type === "sculpture") {
        return Sculptures;
    }
    else if (type === "painting") {
        return Paintings;
    }
};
// Récupération du nom de la vignette
const getThumbnailName = (thumbnailFile) => {
    return thumbnailFile[0].filename;
};
// Récupération d'un tableau avec le nom des photos
const getPhotosNamesArray = (photosFilesArray) => {
    let photosNamesArray = [];
    for (let i = 0; i < photosFilesArray.length; i++) {
        photosNamesArray.push(photosFilesArray[i].filename);
    }
    return photosNamesArray;
};
// Suppression de la vignette
const deleteThumbnail = (thumbnail) => {
    if (thumbnail) {
        fs.unlink(`dist/images/${thumbnail}`, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Thumbnail deleted !");
            }
        });
    }
};
// Suppression des photos
const deletePhotos = (photosArray) => {
    if (photosArray) {
        for (let i = 0; i < photosArray.length; i++) {
            fs.unlink(`dist/images/${photosArray[i]}`, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Photo deleted !");
                }
            });
        }
    }
};
// Récupération des œuvres par type
exports.getWorkByType = (req, res) => {
    selectModel(req.params.type).find({ type: req.params.type }, (err, works) => {
        if (err) {
            // console.log(err);
            res.status(404).json({ err });
        }
        else {
            console.log(works);
            res.status(200).json(works);
        }
        ;
    });
};
// Récupération d'une sculpture par ID
exports.getSculptureById = (req, res) => {
    Sculptures.findById(mongoose.Types.ObjectId(req.params.id), (err, sculpture) => {
        if (err) {
            res.status(404).json({ erreur: "Sculpture introuvable !" });
        }
        else {
            res.status(200).json(sculpture);
        }
        ;
    });
};
// Récupération d'une peinture par ID
exports.getPaintingById = (req, res) => {
    Paintings.findById(mongoose.Types.ObjectId(req.params.id), (err, painting) => {
        if (err) {
            res.status(404).json({ erreur: "Peinture introuvable !" });
        }
        else {
            res.status(200).json(painting);
        }
    });
};
// Ajoût d'une nouvelle œuvre
exports.addNewWork = (req, res) => {
    const thumbnailName = getThumbnailName(req.files.thumbnail);
    const photosNamesArray = getPhotosNamesArray(req.files.photos);
    if (!thumbnailName) {
        deletePhotos(photosNamesArray);
        res.status(400).json({ erreur: "Aucune vignette n'a été selectionnée" });
    }
    else if (!photosNamesArray) {
        deleteThumbnail(thumbnailName);
        res.status(400).json({ erreur: "Aucune photo n'a été selectionnée" });
    }
    else if (!req.body.name) {
        deleteThumbnail(thumbnailName);
        deletePhotos(photosNamesArray);
        res.status(400).json({ erreur: "Aucun nom n'a été saisi" });
    }
    else if (!req.body.type) {
        deleteThumbnail(thumbnailName);
        deletePhotos(photosNamesArray);
        res.status(400).json({ erreur: "Aucun type n'a été indiqué" });
    }
    else {
        selectModel(req.body.type).create({
            _id: mongoose.Types.ObjectId(),
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            thumbnail: thumbnailName,
            photos: photosNamesArray,
            instagram: req.body.instagram,
            like: 0,
            create_date: Date.now(),
            update_date: Date.now(),
        }, (err) => {
            if (err) {
                deleteThumbnail(thumbnailName);
                deletePhotos(photosNamesArray);
                res.status(400).json(err);
            }
            else {
                res.status(200).json({ message: "L'œuvre a été ajoutée" });
            }
        });
    }
};
// Suppression d'une œuvre par ID
exports.deleteWorkById = (req, res) => {
    const type = req.params.type;
    const workId = mongoose.Types.ObjectId(req.params.id);
    selectModel(type).findById(workId, (err, work) => {
        if (err) {
            res.status(400).json({ erreur: "Œuvre introuvable" });
        }
        else {
            const thumbnail = work.thumbnail;
            const photosArray = work.photos;
            selectModel(type).deleteOne({ _id: workId }, err => {
                if (err) {
                    res.status(400).json({ erreur: "La suppression a échouée !" });
                }
                else {
                    console.log(thumbnail);
                    console.log(photosArray);
                    deleteThumbnail(thumbnail);
                    deletePhotos(photosArray);
                    res.status(200).json({ message: `${work.name} a bien été supprimé !` });
                }
            });
        }
    });
};
