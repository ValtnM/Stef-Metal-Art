import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

exports.login = (req: Request, res: Response) => {
    const user = req.body.user;
    const password = req.body.password;

    console.log(req.body);
    

    if(user === process.env.USER && password === process.env.PASSWORD) {
        res.status(200).json({
            isAdmin: true,
            token: jwt.sign(
                {
                    userName: process.env.USER
                },
                process.env.TOKEN_KEY,
                {expiresIn: '1h'}
            )
        })
    } else {
        res.status(400).json({isAdmin: false, error: "Nom d'utilisateur ou mot de passe incorrect"})
    }

};

exports.checkToken = (req: Request, res: Response) => {
    const token = req.params.token;
    if(token !== null) {
        try {
            let jwtToken = jwt.verify(token, process.env.TOKEN_KEY);
            if(jwtToken.userName === process.env.USER) {
                res.status(200).json({isAdmin: true})
            } else {
                res.status(400).json({isAdmin: false})
            }
        } catch (error) {
            res.status(400).json({error: "Action non autorisée !"})
        }
    }
}