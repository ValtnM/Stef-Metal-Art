const mongoose = require("mongoose");
const fs = require("fs");
import { Request, Response, NextFunction } from "express";

const { Sculptures } = require("../models/Oeuvre.js");
const { Peintures } = require("../models/Oeuvre.js");

interface MulterRequest extends Request {
  files: any;
}
const formatType = (param) => {
  let type = param.split("");
  type.pop();
  return type.join('');
}

exports.getOeuvreByType = (req: Request, res: Response) => {
  const type = formatType(req.params.type)  
  Sculptures.find({ type: type })
    .then((oeuvres) => res.status(200).json(oeuvres))
    .catch((err) => res.status(400).json({ err }));
};


exports.getSculptureById = (req: Request, res: Response) => {
  Sculptures.findById(mongoose.Types.ObjectId(req.params.id))
    .then((sculpture) => {
      res.status(200).json(sculpture);
    })
    .catch(() => res.status(404).json({ erreur: "Sculpture introuvable !" }));
};

exports.getPeintureById = (req: Request, res: Response) => {
  Peintures.findById(mongoose.Types.ObjectId(req.params.id))
    .then((peinture) => {
      res.status(200).json(peinture);
    })
    .catch(() => res.status(404).json({ erreur: "Peinture introuvable !" }));
};

exports.addNewPost = (req: MulterRequest, res: Response) => {
  const thumbnail = req.files.thumbnail;
  const photosArray = req.files.photos;
  
  const deleteThumbnail = () => {
    if(thumbnail) {
      fs.unlink(`dist/images/${thumbnail[0].filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Thumbnail deleted !");
        }
      });
    }
  };
  
  const deletePhotos = () => {
    if(photosArray) {
      for (let i = 0; i < photosArray.length; i++)
      fs.unlink(`dist/images/${photosArray[i].filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Photo deleted !");
        }
      });
    }
  };

if (!thumbnail) {
  deletePhotos();
  res.status(400).json({ erreur: "Aucune vignette n'a été selectionnée" });
} else if (!photosArray) {
  deleteThumbnail();
  res.status(400).json({ erreur: "Aucune photo n'a été selectionnée" });
} else if (!req.body.name) {
  deleteThumbnail();
  deletePhotos();
    res.status(400).json({ erreur: "Aucun nom n'a été saisi" });
} else if (!req.body.type) {
  deleteThumbnail();
  deletePhotos();
    res.status(400).json({ erreur: "Aucun type n'a été indiqué" });
  } else {

    const type = req.body.type
    let Model: Function;
  
    if (type === "sculpture") {
      Model = () => {
        return Sculptures;
      };
    } else if (type === "peinture") {
      Model = () => {
        return Peintures;
      };
    }

    let photoNamesArray: String[] = [];
    for (let i = 0; i < photosArray.length; i++) {
      photoNamesArray.push(photosArray[i].filename);
    }

    Model().create(
      {
        _id: mongoose.Types.ObjectId(),
        type: type,
        name: req.body.name,
        description: req.body.description,
        thumbnail: thumbnail[0].filename,
        photos: photoNamesArray,
        instagram: req.body.instagram,
        like: 0,
        create_date: Date.now(),
        update_date: Date.now(),
      },
      (err) => {
        if(err) {
          deleteThumbnail();
          deletePhotos();
          res.status(400).json(err);
        } else {
          res.status(200).json({ message: "L'œuvre a été ajoutée" });
        }
      }
    );
  }
};
