import { Request, Response } from "express";
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

exports.login = (req: Request, res: Response) => {
    const user = req.body.user;
    const password = req.body.password;
    
            console.log("USER: ", user);
            console.log("PASSWORD: ", password);
            console.log(".env USER: ", process.env.USERNAME);
            console.log(".env PASSWORD: ", process.env.PASSWORD);
            

    if(mongoose.connection.readyState === 1) {
        
        
        if(user === process.env.USERNAME && password === process.env.PASSWORD) {
            res.status(200).json({
                isAdmin: true,
                token: jwt.sign(
                    {
                        userName: process.env.USERNAME
                    },
                    process.env.TOKEN_KEY,
                    {expiresIn: '1h'}
                    )
                })
            } else {
                res.status(400).json({isAdmin: false, error: "Nom d'utilisateur ou mot de passe incorrect"})
            }
        } else {
            res.status(400).json({error: "Database not connected"})
        }

};

exports.checkToken = (req: Request, res: Response) => {
    const token = req.params.token;
    if(token !== null) {
        try {
            let jwtToken = jwt.verify(token, process.env.TOKEN_KEY);
            if(jwtToken.userName === process.env.USERNAME) {
                res.status(200).json({isAdmin: true})
            } else {
                res.status(400).json({isAdmin: false})
            }
        } catch (error) {
            res.status(400).json({error: "Action non autorisée !"})
        }
    }
}