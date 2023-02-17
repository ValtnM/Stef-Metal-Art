const Sculpture = require('../models/Sculpture.js');
console.log('ok');
exports.getAllSculpture = (req, res, next) => {
    Sculpture.find()
        .then(sculptures => res.status(200).json(sculptures))
        .catch(err => res.status(400).json({ err }));
};
exports.addSculpture = (req, res, next) => {
    const sculptureObject = req.body;
    console.log(sculptureObject);
    const sculpture = new Sculpture(Object.assign(Object.assign({}, sculptureObject), { instagram: false, like: 0 }));
    sculpture.save()
        .then(() => res.status(201).json({ message: 'sculpture ajoutée !' }))
        .catch(() => res.status(400).json({ erreur: "erreur" }));
};
