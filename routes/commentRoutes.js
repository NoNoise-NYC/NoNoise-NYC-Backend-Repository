const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

router.get('/comment', commentController.getComments);
router.post('/comment', commentController.addComment)


module.exports = router;