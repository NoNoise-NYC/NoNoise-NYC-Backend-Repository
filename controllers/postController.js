const { Posts } = require("../model/postModel");
const { Users } = require("../model/userModel");
const jwt = require("jsonwebtoken");

// Route to get all posts
const getPost = async (request, response) => {
  const data = await Posts.grabPostFromDB();
  response.send(data);
};

// Route to add a new post
const addPost = async (request, response) => {
  const postInfo = request.body;

  const post = await Posts.addPostToDB(
    postInfo.user_id,
    postInfo.post_title,
    postInfo.post_description,
    postInfo.post_type,
    postInfo.likes
  );
  console.log(post);
  response.send(await Posts.grabPostFromDB());
};

// Route to get filtered posts based on a specified filter
const getFilteredPosts = async (request, response) => {
  const filterValue = request.params.filter;
  const filteredPosts = await Posts.grabFilteredPostsFromDB(filterValue);
  response.send(filteredPosts);
};

// Route to update the number of likes for a specific post
const updateLikes = async (request, response) => {
  console.log(request.body);
  const postId = request.body.postId;
  const isLiked = request.body.isLiked;
  if (!isLiked) {
    const post = await Posts.addToLikesForGivenPostInDB(postId);
    console.log(post);
    response.send(post);
  } else {
    const post = await Posts.subtractLikesForGivenPostInDB(postId);
    console.log(post);
    response.send(post);
  }
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
    console.log(postId)
    const post = await Posts.grabPostInfoFromDB(postId)
     console.log(post)
const id = post.id
console.log(id)
 const deleted =  await Posts.removePost(id);
 console.log(deleted)
 response.send(await Posts.grabPostFromDB());
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
  deletePost,
};
