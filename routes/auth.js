const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const servicesController = require('../controller/servicesController');
const jwt = require('jsonwebtoken');

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || "Hippocloud_welcome", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid or Expired token' });
        }

        req.user = decoded; // Attach decoded user to request object
        next();
    });
};

// Routes
router
    .post('/login', authController.login)
    .get('/protectedroute', verifyToken, authController.protectedroute)
    .post('/signup',authController.signup)
    .get('/coursesCount',servicesController.coursesCount)
    .get('/marketingCount',servicesController.marketingCount)
    .get('/enquiryCount',servicesController.enquiryCount)
    .get('/tallyCount',servicesController.tallyCount)
    .get('/internCount',servicesController.internCount)
    .get('/trainerCount',servicesController.trainerCount)
    .get('/getmonths',servicesController.getmonths)
    .get('/studentCount/:endpoint',servicesController.studentCount)

module.exports = router;
