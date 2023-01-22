const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

router.get('/', commentController.getComments);
router.post('/', commentController.addComment)


module.exports = router;