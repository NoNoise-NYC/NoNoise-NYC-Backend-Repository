const { Posts } = require('../model/postModel');
const { Users } = require('../model/userModel');
const jwt = require('jsonwebtoken');

// Route to get all posts
const getPost = async (request, response) => {
  const data = await Posts.grabPostFromDB()
  response.send(data);
};

// Route to add a new post
const addPost = async (request, response) => {
  const postInfo = request.body;

  // Extract the user id from the authentication token


  const post = await Posts.addPostToDB({
    user_id: postInfo.userId,
    post_title: postInfo.post_title,
    post_description: postInfo.post_description,
    post_type: postInfo.post_type,
    likes: 0
  });

  response.send(post);
};

// Route to get filtered posts based on a specified filter
const getFilteredPosts = async (request, response) => {
  const filterValue = request.params.filter;
  const filteredPosts = await Posts.grabFilteredPostsFromDB(filterValue);
  response.send(filteredPosts);
};

// Route to update the number of likes for a specific post
const updateLikes = async (request, response) => {
  const postId = request.body.postId;
  const isLiked = request.body.isLiked;

  let postWithUpdatedLikes = null;
  const post = await Posts.grabFilteredPostsFromDB(postId);
  if (isLiked) {
    post.likes--;
  } else {
    post.likes++;
  }
  postWithUpdatedLikes = await Posts.addPostToDB(post);

  response.send(postWithUpdatedLikes);
};

// Route to search for posts based on a specified search term
const getSearchPost = async (request, response) => {
  const search = request.params.search;
  const data = await Posts.grabPostFromDBBySearch(search);
  response.send(data);
};

// Route to get all posts ordered by the number of comments they have
const grabPostOrderByComment = async (request, response) => {
  const data = await Posts.grabPostOrderByComment();
  response.send(data);
};

// Route to get all posts ordered by the number of likes they have
const grabPostOrderByLikes = async (request, response) => {
  const data = await getPostsByUser.getAllPostsSortedByLikes();
  response.send(data);
};

// Route to get all posts by a specific user
const getUserPosts = async (request, response) => {
  const userId = request.params.userId;
  const userPosts = await Posts.getPostsByUser(userId);
  response.send(userPosts);
};

// Route to get a specific post by its ID
const getPostById = async (request, response) => {
  const postId = request.params.postId;
  const post = await Posts.getPostById(postId);
  response.send(post);
};

// Route to delete a specific post by its ID
const deletePost = async (request, response) => {
  const postId = request.params.postId;
  await Posts.removePost(postId);
  response.send("Post deleted successfully");
};

module.exports = {
  getPost,
  addPost,
  getFilteredPosts,
  updateLikes,
  getSearchPost,
  grabPostOrderByComment,
  grabPostOrderByLikes,
  getUserPosts,
  getPostById,
  deletePost
};
