const express = require('express');
const router = express.Router();

const oeuvreCtrl = require('../controllers/oeuvre.ts')

router.get('/', oeuvreCtrl.getAllSculpture);


module.exports = router;