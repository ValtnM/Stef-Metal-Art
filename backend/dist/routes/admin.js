"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.js');
router.post('/', adminCtrl.login);
router.get('/:token', adminCtrl.checkToken);
module.exports = router;
