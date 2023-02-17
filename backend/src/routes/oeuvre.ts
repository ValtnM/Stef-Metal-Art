const express = require('express');
const router = express.Router();

const oeuvreCtrl = require('../controllers/oeuvre.js')

router.get('/sculptures', oeuvreCtrl.getAllSculpture);
router.get('/sculptures/:id', oeuvreCtrl.getOneSculpture);
router.get('/peintures', oeuvreCtrl.getAllPeinture);
router.get('/peintures/:id', oeuvreCtrl.getOnePeinture);


module.exports =  router;
export {};