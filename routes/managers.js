const express = require('express');
const router = express.Router();
const managerController = require('../controller/managerController');

// Token verification middleware


// Routes
router

.get('/domains',managerController.domains)
.post('/trainers',managerController.trainers)
.post('/enquiry',managerController.enquiry)   
.get('/gettrainers/:domain',managerController.gettrainers)
.post('/student',managerController.student)
.get('/trainerlist',managerController.trainerlist)
.get('/enquirylist',managerController.enquirylist)
.get('/traineeslist',managerController.traineeslist)


module.exports = router;
