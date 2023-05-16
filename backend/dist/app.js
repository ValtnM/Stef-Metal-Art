const express = require("express");
const app = express();
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const mongoose = require("mongoose");
const hostname = "localhost";
const port = 8080;
// Connexion à la base de données
mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://localhost:27018/stef_metal_art")
    // .connect("mongodb://localhost:27017/stef_metal_art")
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Échec de la connexion à MongoDB !"));
// Importation des routes
const workRoutes = require("./routes/work.js");
const emailRoutes = require('./routes/email.js');
const adminRoutes = require("./routes/admin.js");
const linkRoutes = require("./routes/link.js");
// Middlewares permettant l'analyse du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Autorise l'accès à l'API et l'envoie de requêtes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Cross-Origin-Resource-Policy", ["same-site", "cross-origin"]);
    next();
});
// Définition des chemins vers les différentes routes
app.use("/api/works", workRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/link", linkRoutes);
// Gestion des requêtes vers la route '/images'
app.use('/api/images', express.static(path.join(__dirname, 'images')));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
