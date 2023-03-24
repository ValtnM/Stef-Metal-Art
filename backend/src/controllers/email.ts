import { Request, Response } from "express";
const nodemailer = require("nodemailer");
import axios from "axios";
require("dotenv").config();

exports.sendEmail = (req: Request, res: Response) => {
  const mailInfos = {
    from: `${req.body.firstname} ${req.body.lastname} <contact@stef-metal-art.fr>`,
    to: "contact@stef-metal-art.fr",
    subject: req.body.subject,
    text: req.body.message,
    replyTo: req.body.email,
  };

  const validateHuman = async (token: string) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    axios
      .post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
      .then((response) => {
        if (!response.data.success) {
          res.status(400).json({ error: "Veuillez cocher la case 'je ne suis pas un robot'" });
          return;
        } else {
          sendingMail(mailInfos);
        }
      })
      .catch((err) => console.log(err));
  };

  const transporter = nodemailer.createTransport({
    host: "pro1.mail.ovh.net",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const sendingMail = (mailInfos) => {
    if (!req.body.firstname) {
      res.status(400).json({ error: "Veuillez saisir un prénom" });
    } else if (!req.body.lastname) {
      res.status(400).json({ error: "Veuillez saisir un nom" });
    } else if (!req.body.email) {
      res.status(400).json({ error: "Veuillez saisir un email valide" });
    } else if (!req.body.subject) {
      res.status(400).json({ error: "Aucun objet n'a été saisi" });
    } else if (!req.body.message) {
      res.status(400).json({ error: "Aucun message n'a été saisi" });
    } else {
      transporter.sendMail(mailInfos, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: "Échec de l'envoi" });
        } else {
          res.status(200).json({ message: "Message envoyé avec succès" });
        }
      });
    }
  };
  validateHuman(req.body.token);
};
