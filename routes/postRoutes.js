const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');


router.get('/', postController.getPost);

router.post('/', postController.addPost);


module.exports = router;