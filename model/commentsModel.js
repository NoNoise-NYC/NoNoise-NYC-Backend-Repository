const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new Schema({
commentId: { type: Number, required: true },
userId: { type: Number, required: true },
postId: { type: Number, required: true },
commentDescription: { type: String, required: true },
likes: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("comments", commentSchema);

class Comments {
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

static async createCommentToDB(commentId,userId, postId, comment) {
try {
const newComment = await Comment.create({ commentId,userId, postId, commentDescription: comment });
return newComment;
} catch (error) {
throw new Error(error);
}
}
}

module.exports = {Comments}

process.on('SIGINT', () => {
mongoose.connection.close();
process.exit();
});