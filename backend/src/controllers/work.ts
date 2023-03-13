const mongoose = require("mongoose");
const fs = require("fs");
import { Request, Response } from "express";

const { Sculptures } = require("../models/Work.js");
const { Paintings } = require("../models/Work.js");

interface MulterRequest extends Request {
  files: any;
}

// Selection d'un modèle en fonction du type d'œuvre
const selectModel = (type: string) => {
  if (type === "sculpture") {
    return Sculptures;
  } else if (type === "painting") {
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
      } else {
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
        } else {
          console.log("Photo deleted !");
        }
      });
    }
  }
};


// Récupération des œuvres par type
exports.getWorkByType = (req: Request, res: Response) => {
  selectModel(req.params.type).find({ type: req.params.type }, (err, works) => {
    if (err) {
      res.status(404).json({ err });
    } else {
      res.status(200).json(works);
    }
  });
};

// Récupération d'une sculpture par ID
exports.getSculptureById = (req: Request, res: Response) => {
  Sculptures.findById(mongoose.Types.ObjectId(req.params.id), (err, sculpture) => {
    if (err) {
      res.status(404).json({ erreur: "Sculpture introuvable !" });
    } else {
      res.status(200).json(sculpture);
    }
  });
};

// Récupération d'une peinture par ID
exports.getPaintingById = (req: Request, res: Response) => {
  Paintings.findById(mongoose.Types.ObjectId(req.params.id), (err: Error, painting) => {
    if (err) {
      res.status(404).json({ erreur: "Peinture introuvable !" });
    } else {
      res.status(200).json(painting);
    }
  });
};

// Ajoût d'une nouvelle œuvre
exports.addNewWork = (req: MulterRequest, res: Response) => {
  const thumbnailName = getThumbnailName(req.files.thumbnail);
  const photosNamesArray = getPhotosNamesArray(req.files.photos);

  if (!thumbnailName) {
    deletePhotos(photosNamesArray);
    res.status(400).json({ erreur: "Aucune vignette n'a été selectionnée" });
  } else if (!photosNamesArray) {
    deleteThumbnail(thumbnailName);
    res.status(400).json({ erreur: "Aucune photo n'a été selectionnée" });
  } else if (!req.body.name) {
    deleteThumbnail(thumbnailName);
    deletePhotos(photosNamesArray);
    res.status(400).json({ erreur: "Aucun nom n'a été saisi" });
  } else if (!req.body.type) {
    deleteThumbnail(thumbnailName);
    deletePhotos(photosNamesArray);
    res.status(400).json({ erreur: "Aucun type n'a été indiqué" });
  } else {
    selectModel(req.body.type).create(
      {
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
      },
      (err) => {
        if (err) {
          deleteThumbnail(thumbnailName);
          deletePhotos(photosNamesArray);
          res.status(400).json(err);
        } else {
          res.status(200).json({ message: "L'œuvre a été ajoutée" });
        }
      }
    );
  }
};

// Suppression d'une œuvre par ID
exports.deleteWorkById = (req: MulterRequest, res: Response) => {
  const type = req.params.type;
  const workId = mongoose.Types.ObjectId(req.params.id);
  selectModel(type).findById(workId, (err, work) => {
    if (err) {
      res.status(400).json({ erreur: "Œuvre introuvable" });
    } else {
      const thumbnail = work.thumbnail;
      const photosArray = work.photos;
      selectModel(type).deleteOne({ _id: workId }, (err) => {
        if (err) {
          res.status(400).json({ erreur: "La suppression a échouée !" });
        } else {
          deleteThumbnail(thumbnail);
          deletePhotos(photosArray);
          res.status(200).json({ message: `${work.name} a bien été supprimé !` });
        }
      });
    }
  });
};

// Modification d'une sculpture
exports.updateWorkById = (req: MulterRequest, res: Response) => {
  const workId = mongoose.Types.ObjectId(req.params.id);
  const typeOfWork = req.body.typeOfWork;

  if (typeOfWork) {
    selectModel(typeOfWork).findById(workId, (err, work) => {
      if (err) {
        res.status(400).json({ erreur: "Œuvre introuvable" });
      } else {
        if (req.body.typeOfData === "thumbnail") {
          const oldThumbnailFilename = work.thumbnail;
          selectModel(typeOfWork).updateOne({ _id: workId }, { thumbnail: getThumbnailName(req.files.thumbnail) }, (err) => {
            if (err) {
              res.status(400).json({ erreur: "La vignette n'as pas pu être modifiée" });
            } else {
              deleteThumbnail(oldThumbnailFilename);
              res.status(200).json({ message: "La vignette a bien été modifiée" });
            }
          });
        } else if (req.body.typeOfData === "name" || req.body.typeOfData === "description") {
          console.log(typeOfWork);
          console.log(workId);
          console.log(req.body.name);
          
          
          
          selectModel(typeOfWork).updateOne({ _id: workId }, { name: req.body.name, description: req.body.description }, (err) => {
            if (err) {
              res.status(400).json({ erreur: "La modification a échouée" });
            } else {
              res.status(200).json({ message: "L'œuvre a bien été modifiée" });
            }
          });
        } else if (req.body.typeOfData === "photos") {
          const oldPhotos = work.photos;
          const newPhotos = getPhotosNamesArray(req.files.photos);
          if (typeOfWork === "sculpture") {
            let newArrayOfPhotos = oldPhotos.concat(newPhotos);
            selectModel(typeOfWork).updateOne({ _id: workId }, { photos: newArrayOfPhotos }, (err) => {
              if (err) {
                res.status(400).json({ erreur: "L'ajoût de photos a échoué" });
              } else {
                res.status(200).json({ message: "La/les photo(s) a/ont bien été ajoutée(s)" });
              }
            });
          } else if (typeOfWork === "painting") {
            deletePhotos(oldPhotos);
            selectModel(typeOfWork).updateOne({ _id: workId }, { photos: newPhotos }, (err) => {
              if (err) {
                res.status(400).json({ erreur: "L'ajoût de photos a échoué" });
              } else {
                res.status(200).json({ message: "La/les photo(s) a/ont bien été ajoutée(s)" });
              }
            });
          }
        }
      }
    });
  }
};


exports.deletePhotoByName = (req: MulterRequest, res: Response) => {
  const workId = mongoose.Types.ObjectId(req.params.id);
  const photoName = req.params.photoName;
  const typeOfWork = req.body.typeOfWork;

  const deletePhoto = (oldPhotosArray: string[], photoName: string) => {
    const index = oldPhotosArray.indexOf(photoName)
    let newPhotosArray = oldPhotosArray;
    newPhotosArray.splice(index, 1);
    return newPhotosArray;
  }
  
  selectModel(typeOfWork).findById(workId, (err: Error, work) => {
    if(err) {
      res.status(400).json(err)
    } else {

      selectModel(typeOfWork).updateOne({_id: workId}, {photos: deletePhoto(work.photos, photoName)}, err => {
        if(err) {
          res.status(400).json({erreur: "Échec lors de la suppression de la photo"})
        } else {
          fs.unlink(`dist/images/${photoName}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Photo deleted !");
            }
          });
          res.status(200).json({message: "La photo a bien été supprimée"})
        }
      } )
    }
  })
}
