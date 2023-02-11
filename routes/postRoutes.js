const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');


router.get('/post', postController.getPost);

router.post('/posts', postController.addPost);


module.exports = router;