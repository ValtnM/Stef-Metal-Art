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
    if (photosFilesArray) {
        for (let i = 0; i < photosFilesArray.length; i++) {
            photosNamesArray.push(photosFilesArray[i].filename);
        }
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
            res.status(200).json(works);
        }
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
            selectModel(type).deleteOne({ _id: workId }, (err) => {
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
// Modification d'une sculpture
exports.updateWorkById = (req, res) => {
    const workId = mongoose.Types.ObjectId(req.params.id);
    // console.log(req.body);
    const typeOfWork = req.body.typeOfWork;
    if (typeOfWork) {
        console.log(selectModel(typeOfWork));
        selectModel(typeOfWork).findById(workId, (err, work) => {
            console.log('ola');
            if (err) {
                res.status(400).json({ erreur: "Sculpture introuvable" });
            }
            else {
                console.log("HELLO");
                if (req.body.typeOfData === "thumbnail") {
                    const oldThumbnailFilename = work.thumbnail;
                    selectModel(typeOfWork).updateOne({ _id: workId }, { thumbnail: getThumbnailName(req.files.thumbnail) }, (err) => {
                        if (err) {
                            res.status(400).json({ erreur: "La vignette n'as pas pu être modifiée" });
                        }
                        else {
                            deleteThumbnail(oldThumbnailFilename);
                            res.status(200).json({ message: "La vignette a bien été modifiée" });
                        }
                    });
                }
                else if (req.body.typeOfData === "name" || req.body.typeOfData === "description") {
                    console.log("NAME");
                    selectModel(typeOfWork).updateOne({ _id: workId }, { name: req.body.name, description: req.body.description }, (err) => {
                        if (err) {
                            res.status(400).json({ erreur: "La modification a échouée" });
                        }
                        else {
                            res.status(200).json({ message: "L'œuvre a bien été modifiée" });
                        }
                    });
                }
                else if (req.body.typeOfData === "photos") {
                    const oldPhotos = work.photos;
                    const newPhotos = getPhotosNamesArray(req.files.photos);
                    if (typeOfWork === "sculpture") {
                        let newArrayOfPhotos = oldPhotos.concat(newPhotos);
                        selectModel(typeOfWork).updateOne({ _id: workId }, { photos: newArrayOfPhotos }, (err) => {
                            if (err) {
                                res.status(400).json({ erreur: "L'ajoût de photos a échoué" });
                            }
                            else {
                                res.status(200).json({ message: "La/les photo(s) a/ont bien été ajoutée(s)" });
                            }
                        });
                    }
                    else if (typeOfWork === "painting") {
                        deletePhotos(oldPhotos);
                        selectModel(typeOfWork).updateOne({ _id: workId }, { photos: newPhotos }, (err) => {
                            if (err) {
                                res.status(400).json({ erreur: "L'ajoût de photos a échoué" });
                            }
                            else {
                                res.status(200).json({ message: "La/les photo(s) a/ont bien été ajoutée(s)" });
                            }
                        });
                    }
                }
            }
        });
    }
};
