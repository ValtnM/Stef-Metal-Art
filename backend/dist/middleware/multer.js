"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importation de multer
const multer = require("multer");
// Création du dictionnaire MIME_TYPES
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};
// Création du multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./dist/images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(".")[0].split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});
// Exportation du multer
module.exports = multer({ storage });
