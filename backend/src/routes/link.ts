const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer.js')

const linkCtrl = require('../controllers/link.js')

router.get('/', linkCtrl.getAllLinks);
router.post('/', multer.single('thumbnail'), linkCtrl.addLink);
router.delete('/:linkId', linkCtrl.deleteLinkById);



module.exports =  router;
export {};