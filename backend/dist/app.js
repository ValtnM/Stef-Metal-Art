const express = require("express");
const app = express();
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const hostname = "localhost";
const port = 8080;
// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem")
// };
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://localhost:27018/stef_metal_art")
    // .connect("mongodb://localhost:27017/stef_metal_art")
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Échec de la connexion à MongoDB !"));
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
app.use("/api/works", workRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/link", linkRoutes);
// Gestion des requêtes vers la route '/images'
app.use('/api/images', express.static(path.join(__dirname, 'images')));
// Ecoute et lie l'application au port 3000
// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('home page\n');
// }).listen(port, hostname)
// http.createServer(app).listen(8080);
// https.createServer(options, app).listen(8080);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
