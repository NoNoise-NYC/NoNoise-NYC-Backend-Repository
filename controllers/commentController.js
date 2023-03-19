const mongoose = require("mongoose");
const {Comments} = require('../model/commentsModel');

const getComments = async (request, response) => {
    const postId = request.params.id;
    const comment = await Comments.grabCommentsFromDB(postId);
    response.send(comment);
  };


  const getAllComments = async (request, response) => {
    const comment = await Comments.grabCommentFromDB();
    response.send(comment);
  }
const addComment = async (req, res) => {
  const postId = req.params.id
try {

const {userId,commentary,likes} = req.body;

const newComment = await Comments.createCommentToDB(userId,postId,commentary,likes);
return newComment ? res.status(200).send(newComment) : res.sendStatus(404);
} catch (error) {
return res.status(500).send({error: error.message});
}
};

module.exports = {
getComments,
addComment,
getAllComments
};



