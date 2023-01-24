const mongoose = require("mongoose");
    const Post = mongoose.model("Post");
    const Users = mongoose.model("Users");
    
    const getPost = async (request, response) => {
    const data = await Post.find({});
    response.send(data);
    }
    
    const addPost = async (request, response) => {
    const postInfo = request.body;
    const user = await Users.findOne({ username: postInfo.username });
    const newPost = new Post({
    user_id: user._id,
    post_title: postInfo.post_title,
    post_description: postInfo.post_description,
    post_type: postInfo.post_type,
    likes: 0
    });
    const post = await newPost.save();
    response.send(post);
    }
    
    const getFilteredPosts = async (request, response) => {
    const filterValue = request.params.filter;
    const filteredPosts = await Post.find({ post_type: filterValue });
    response.send(filteredPosts);
    }
    
    const updateLikes = async (request, response) => {
    const username = request.body.username;
    const postTitle = request.body.postTitle;
    const isLiked = request.body.isLiked;
    
    let postWithUpdatedLikes = null;
const post = await Post.findOne({ post_title: postTitle });
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
const data = await Post.find({ post_title: { $regex: search, $options: "i" } });
response.send(data);
}

const grabPostOrderByComment = async (request, response) => {
const data = await Post.find({}).sort({ comments: "desc" });
response.send(data);
}

const grabPostOrderByLikes = async (request, response) => {
const data = await Post.find({}).sort({ likes: "desc" });
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