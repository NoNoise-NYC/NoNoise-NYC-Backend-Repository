const mongoose = require("mongoose");
const {Comments} = require('../model/commentsModel');

const getComments = async (req, res) => {
    const data = await Comments.grabCommentFromDB()
    res.send(data);
};

const addComment = async (req, res) => {
try {
const {user_id,post_id,commentary,likes} = req.body;
const newComment = await Comments.createCommentToDB(user_id,post_id,commentary,likes);
return newComment ? res.status(200).send(newComment) : res.sendStatus(404);
} catch (error) {
return res.status(500).send({error: error.message});
}
};

module.exports = {
getComments,
addComment
};



