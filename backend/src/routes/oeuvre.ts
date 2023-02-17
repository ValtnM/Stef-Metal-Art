const express = require('express');
const router = express.Router();

const oeuvreCtrl = require('../controllers/oeuvre.js')

router.get('/', oeuvreCtrl.getAllSculpture);
router.post('/', oeuvreCtrl.addSculpture);


module.exports =  router;
export {};