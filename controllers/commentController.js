const mongoose = require("mongoose");
const {Comments} = require('../model/commentsModel');

const getComments = async (req, res) => {
try {
const commentsList = await Comments.find({});
return commentsList ? res.status(200).send(commentsList) : res.sendStatus(404);
} catch (error) {
return res.status(500).send({error: error.message});
}
};

const addComment = async (req, res) => {
try {
const { commentary, post_id, user_id } = req.body;
const newComment = await Comments.create({ commentary, post_id, user_id });
return newComment ? res.status(200).send(newComment) : res.sendStatus(404);
} catch (error) {
return res.status(500).send({error: error.message});
}
};

module.exports = {
getComments,
addComment
};



