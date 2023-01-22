const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');


router.get('/posts', postController.getPosts);

router.post('/posts', postController.addPost);


module.exports = router;