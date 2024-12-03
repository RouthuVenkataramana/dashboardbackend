const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Token verification middleware


// Routes
router

.get('/count/:courseOptions',adminController.count)
.get('/students/:course',adminController.students)
.get('/versions',adminController.versions)   
.delete('/deleteolddata/:stdId',adminController.deleteolddata)
.delete('/deletenewdata/:stdId',adminController.deletenewdata)

module.exports = router;
