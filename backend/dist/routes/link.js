"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const linkCtrl = require('../controllers/link.js');
router.get('/', linkCtrl.getAllLinks);
// router.post('/', linkCtrl.addLink);
module.exports = router;
