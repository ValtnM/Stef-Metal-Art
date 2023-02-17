const mongoose = require("mongoose");
import { Request, Response, NextFunction } from "express";

const Sculpture = require("../models/Sculpture.js");
const Peinture = require("../models/Peinture.js");

exports.getAllSculpture = (req: Request, res: Response, next: NextFunction) => {
  Sculpture.find()
    .then((sculptures) => res.status(200).json(sculptures))
    .catch((err) => res.status(400).json({ err }));
};

exports.getAllPeinture = (req: Request, res: Response, next: NextFunction) => {
  Peinture.find()
    .then((peintures) => res.status(200).json(peintures))
    .catch((err) => res.status(400).json({ err }));
};

exports.getOneSculpture = (req: Request, res: Response, next: NextFunction) => {
  Sculpture.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then((sculpture) => {
      res.status(200).json(sculpture);
    })
    .catch(() => res.status(404).json({ erreur: "Sculpture introuvable !" }));
};

exports.getOnePeinture = (req: Request, res: Response, next: NextFunction) => {
  Peinture.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then((peinture) => {
      res.status(200).json(peinture);
    })
    .catch(() => res.status(404).json({ erreur: "Peinture introuvable !" }));
};
