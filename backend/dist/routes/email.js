"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');
const emailCtrl = require('../controllers/email.js');
router.post('/', emailCtrl.sendEmail);
module.exports = router;
