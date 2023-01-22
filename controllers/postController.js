const { pool } = require('../db.js');
const Post = require('../models/postModel')
const getPosts = async (req, res) => {
    const postList = await Post.getPostFromDB()
    return postList ? res.status(200).send(postList) : res.sendStatus(404);
}
const addPost = async (req, res) => {
    const {post_description, user_id} = req.body
    console.log(req.body)
    const addList = await Post.addPostFromDB(post_description, user_id)
    return addList ? res.status(200).send(addList) : res.sendStatus(404);
} 
module.exports = {
    getPosts,
    addPost
}