const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController.js');

router.get('/complaints', function(req, res){complaintController.getComplaints});

router.post('/complaints', function(req, res){complaintController.createComplaint});

module.exports = router;
