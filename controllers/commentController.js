const { pool } = require('../db.js');
const Comment = require('../models/commentModel')


const getComments = async (req, res) => {
    const commentsList = await Comment.getCommentFromDB()
    return commentsList ? res.status(200).send(commentsList) : res.sendStatus(404);
}

const addComment = async (req, res) => {
    const {commentary, post_id, user_id} = req.body
    console.log(req.body)
    const addComment = await Comment.addCommentToDB(commentary, post_id, user_id)
    return addComment ? res.status(200).send(addComment) : res.sendStatus(404);
}
module.exports = {
    getComments,
    addComment
}