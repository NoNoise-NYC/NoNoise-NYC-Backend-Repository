
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

// Route to get all posts
router.get('/post', postController.getPost);

// Route to add a new post
router.post('/post', postController.addPost);

// Route to get filtered posts based on a specified filter
router.get('/post/:filter', postController.getFilteredPosts);

// Route to update the number of likes for a specific post


// Route to search for posts based on a specified search term
router.get('/post/search/:search', postController.getSearchPost);

// Route to get all posts ordered by the number of comments they have
router.get('/post/order/comments', postController.grabPostOrderByComment);

// Route to get all posts ordered by the number of likes they have
router.get('/post/order/likes', postController.grabPostOrderByLikes);


router.patch('/post/updateLikes', postController.updateLikes);
router.get('/post/user/:userId', postController.getUserPosts);
router.get('/post/:postId', postController.getPostById);
router.delete('/post/:postId', postController.deletePost);

module.exports = router;