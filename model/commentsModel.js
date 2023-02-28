const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// mongoose.connect('mongodb://127.0.0.1:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new Schema({

  userId: { type: Number, required: true },
  postId: { type: Number, required: true },
  commentDescription: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("comments", commentSchema);

// commentSchema.plugin(AutoIncrement, { inc_field: 'id' });

class Comments {

  static async grabCommentFromDB() {
    try {
      const posts = await Comment.find({}).sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async grabLatestCommentIdFromDB() {
    try {
      const latestComment = await Comment.findOne().sort({ commentId: -1 });
      return latestComment.commentId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async grabCommentsFromDB(postId) {
    try {
      const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createCommentToDB( userId, postId, comment,likes) {
    try {
      const newComment = await Comment.create({  userId, postId, commentDescription: comment ,likes});
      return newComment;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Comments, Comment };

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
});
