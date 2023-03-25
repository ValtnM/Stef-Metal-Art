const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js')
const auth = require('../middleware/auth.js')

const workCtrl = require('../controllers/work.js')

// router.get('/sculptures', oeuvreCtrl.getAllSculptures);
router.get('/random/:nbOfWork', workCtrl.getRandomWorks)
router.get('/random/:nbOfWork/:oldWorks', workCtrl.getRandomWork)
router.get('/:type', workCtrl.getWorkByType);
router.get('/:type/:id', workCtrl.getWorkById);
router.post('/', auth, multer.fields([{name: "thumbnail", maxCount: 1},{name: "photos", maxCount: 10}]), workCtrl.addNewWork);
router.delete('/:type/:id', auth, workCtrl.deleteWorkById);
router.put('/:id', auth, multer.fields([{name: "thumbnail", maxCount: 1},{name: "photos", maxCount: 10}]), workCtrl.updateWorkById);
router.put('/:id/:photoName', auth, workCtrl.deletePhotoByName)


module.exports =  router;
export {};