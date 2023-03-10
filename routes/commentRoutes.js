const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

router.get('/comment/:id', commentController.getComments);
router.get('/comment/', commentController.getAllComments);
router.post('/comment/:id', commentController.addComment)


module.exports = router;