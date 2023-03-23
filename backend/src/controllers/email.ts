import { Request, Response } from "express";
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = (req: Request, res: Response) => {
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

  const mail = {
    from: `${req.body.firstname} ${req.body.lastname} <contact@stef-metal-art.fr>`,
    to: "contact@stef-metal-art.fr",
    subject: req.body.subject,
    text: req.body.message,
    replyTo: req.body.email,
  };

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
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Échec de l'envoi" });
      } else {
        res.status(200).json({ message: "Message envoyé avec succès" });
      }
    });
  }
};
