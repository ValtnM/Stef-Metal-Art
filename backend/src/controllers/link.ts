import { log } from "console";
import { Request, Response } from "express";
const Link = require('../models/Link');


exports.getAllLinks = (req: Request, res: Response) => {
    Link.find((err, link) => {
        if(err) {
            res.status(400).json(err)
        } else {
            console.log(link);
            res.status(200).json(link)
            
        }
    })
}