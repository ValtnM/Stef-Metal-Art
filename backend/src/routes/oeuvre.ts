const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js')

const oeuvreCtrl = require('../controllers/oeuvre.js')

// router.get('/sculptures', oeuvreCtrl.getAllSculptures);
router.get('/:type', oeuvreCtrl.getOeuvreByType);
router.get('/sculptures/:id', oeuvreCtrl.getSculptureById);
router.get('/peintures/:id', oeuvreCtrl.getPeintureById);
router.post('/',multer.fields([{name: "thumbnail", maxCount: 1},{name: "photos", maxCount: 10}]), oeuvreCtrl.addNewPost);
router.delete('/:type/:id', oeuvreCtrl.deleteOeuvreById);


module.exports =  router;
export {};