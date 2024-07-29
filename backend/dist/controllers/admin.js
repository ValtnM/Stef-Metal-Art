"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Connection en tant qu'administrateur
exports.login = (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    console.log("USER: ", user);
    console.log("PASSWORD: ", password);
    if (mongoose.connection.readyState === 1) {
        if (user === process.env.LOGNAME && password === process.env.PASSWORD) {
            res.status(200).json({
                isAdmin: true,
                token: jwt.sign({
                    userName: process.env.LOGNAME,
                }, process.env.TOKEN_KEY, { expiresIn: "1h" }),
            });
        }
        else {
            res.status(400).json({ isAdmin: false, error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    }
    else {
        res.status(400).json({ error: "Database not connected" });
    }
};
// Vérification du token d'authentification
exports.checkToken = (req, res) => {
    const token = req.params.token;
    if (token !== null) {
        try {
            let jwtToken = jwt.verify(token, process.env.TOKEN_KEY);
            if (jwtToken.userName === process.env.LOGNAME) {
                res.status(200).json({ isAdmin: true });
            }
            else {
                res.status(400).json({ isAdmin: false });
            }
        }
        catch (error) {
            res.status(400).json({ error: "Action non autorisée !" });
        }
    }
};
