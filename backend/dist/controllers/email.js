"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
exports.sendEmail = (req, res) => {
    const mailInfos = {
        from: `${req.body.firstname} ${req.body.lastname} <contact@stef-metal-art.fr>`,
        to: "contact@stef-metal-art.fr",
        subject: req.body.subject,
        text: req.body.message,
        replyTo: req.body.email,
    };
    // Vérification ReCaptcha
    const validateHuman = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const secret = process.env.RECAPTCHA_SECRET_KEY;
        axios_1.default
            .post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
            .then((response) => {
            if (!response.data.success) {
                res.status(400).json({ error: 'Veuillez cocher la case "je ne suis pas un robot"' });
                return;
            }
            else {
                sendingMail(mailInfos);
            }
        })
            .catch((err) => console.log(err));
    });
    // Création d'un transporter
    const transporter = nodemailer.createTransport({
        host: "pro1.mail.ovh.net",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    // Vérification du transporter
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Server is ready to take our messages");
        }
    });
    // Envoi de l'email
    const sendingMail = (mailInfos) => {
        if (!req.body.firstname) {
            res.status(400).json({ error: "Veuillez saisir un prénom" });
        }
        else if (!req.body.lastname) {
            res.status(400).json({ error: "Veuillez saisir un nom" });
        }
        else if (!req.body.email) {
            res.status(400).json({ error: "Veuillez saisir un email valide" });
        }
        else if (!req.body.subject) {
            res.status(400).json({ error: "Aucun objet n'a été saisi" });
        }
        else if (!req.body.message) {
            res.status(400).json({ error: "Aucun message n'a été saisi" });
        }
        else {
            transporter.sendMail(mailInfos, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: "Échec de l'envoi" });
                }
                else {
                    res.status(200).json({ message: "Message envoyé avec succès" });
                }
            });
        }
    };
    validateHuman(req.body.token);
};
