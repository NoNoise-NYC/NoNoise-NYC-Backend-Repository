const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

    const {Posts,Post} = require('../model/postModel.js');
    const {Users} =  require('../model/userModel.js');
    
    const getPost = async (request, response) => {
    const data = await Post.find({});
    response.send(data);
    }
    
    const addPost = async (request, response) => {
    const postInfo = request.body;
  
    const newPost = {
    user_id: postInfo.user_id,

    post_title: postInfo.post_title,
    post_description: postInfo.post_description,
    post_type: postInfo.post_type,
    likes: postInfo.likes
    }
    const post = await Posts.addPostToDB(postInfo.user_id,postInfo.post_title,postInfo.post_description,postInfo.post_type,postInfo.likes)

    response.send(post);
    }
    
    const getFilteredPosts = async (request, response) => {
    const filterValue = request.params.filter;
    const filteredPosts = await Posts.find({ post_type: filterValue });
    response.send(filteredPosts);
    }
    
    const updateLikes = async (request, response) => {
    const username = request.body.username;
    const postTitle = request.body.postTitle;
    const isLiked = request.body.isLiked;
    
    let postWithUpdatedLikes = null;
const post = await Posts.findOne({ post_title: postTitle });
if (isLiked) {
    post.likes--;
} else {
    post.likes++;
}
postWithUpdatedLikes = await post.save();

response.send(postWithUpdatedLikes);
}

const getSearchPost = async (request, response) => {
const search = request.params.search;
const data = await Posts.find({ post_title: { $regex: search, $options: "i" } });
response.send(data);
}

const grabPostOrderByComment = async (request, response) => {
const data = await Posts.find({}).sort({ comments: "desc" });
response.send(data);
}

const grabPostOrderByLikes = async (request, response) => {
const data = await Posts.find({}).sort({ likes: "desc" });
response.send(data);
}

module.exports = {
getPost,
getFilteredPosts,
addPost,
updateLikes,
getSearchPost,
grabPostOrderByComment,
grabPostOrderByLikes
}