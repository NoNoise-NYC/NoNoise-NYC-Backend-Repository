const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController.js');

router.get('/complaints', complaintController.getComplaints);

router.post('/complaints', complaintController.addComplaint);

module.exports = router;
