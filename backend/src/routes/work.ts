const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js')

const workCtrl = require('../controllers/work.js')

// router.get('/sculptures', oeuvreCtrl.getAllSculptures);
router.get('/:type', workCtrl.getWorkByType);
router.get('/sculptures/:id', workCtrl.getSculptureById);
router.get('/paintings/:id', workCtrl.getPaintingById);
router.post('/',multer.fields([{name: "thumbnail", maxCount: 1},{name: "photos", maxCount: 10}]), workCtrl.addNewWork);
router.delete('/:type/:id', workCtrl.deleteWorkById);
router.put('/:id', multer.fields([{name: "thumbnail", maxCount: 1},{name: "photos", maxCount: 10}]), workCtrl.updateWorkById);


module.exports =  router;
export {};