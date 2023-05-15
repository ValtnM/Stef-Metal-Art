import { NextFunction, Request, Response } from "express";

// Importation des modules
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Vérification du TOKEN d'authentification
module.exports = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userName = decodedToken.userName;
        if(userName && process.env.USERNAME !== userName) {
            throw 'username incorrect !';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({erreur: "Action non autorisée !"});
    }
}