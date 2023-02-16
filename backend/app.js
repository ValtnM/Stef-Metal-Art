const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 8080;

const oeuvreRoutes = require('./routes/oeuvre.ts')

// Middlewares permettant l'analyse du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autorise l'accès à l'API et l'envoie de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

app.use('/api/oeuvres', oeuvreRoutes)

// Ecoute et lie l'application au port 3000
app.listen(port, hostname);