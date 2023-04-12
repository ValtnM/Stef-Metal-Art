const mongoose = require("mongoose");
const fs = require("fs");

import { Request, Response } from "express";

const Link = require("../models/Link");

interface MulterRequest extends Request {
  file: any;
}

const deleteThumbnailFile = (filename) => {
  fs.unlink(`dist/images/${filename}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${filename} was deleted`);
    }
  });
};

exports.getAllLinks = (req: Request, res: Response) => {
  Link.find((err, link) => {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log(link);
      res.status(200).json(link);
    }
  });
};

exports.addLink = (req: MulterRequest, res: Response) => {
  console.log(req.body);
  console.log(req.file);
  const name = req.body.name;
  const filename = req.file.filename;
  const link = req.body.link;

  if (!name) {
    deleteThumbnailFile(filename);
    res.status(400).json({ error: "Aucun nom d'indiquer" });
  } else if (!filename) {
    res.status(400).json({ error: "Aucune vignette d'ajouter" });
  } else if (!link) {
    deleteThumbnailFile(filename);
    res.status(400).json({ error: "Aucun lien d'indiquer" });
  } else {
    Link.create({
        _id: mongoose.Types.ObjectId(),
        name,
        thumbnail: filename,
        link,
        create_date: Date.now(),
        update_date: Date.now()
    }, err => {
        if(err) {
            deleteThumbnailFile(filename);
            res.status(400).json(err)
        } else {
            res.status(200).json({message: "Nouveau lien ajouté"})
        }
    })
  }
};
