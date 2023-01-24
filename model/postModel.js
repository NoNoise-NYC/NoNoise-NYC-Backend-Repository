const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/noNoise', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new Schema({
postId: { type: Number, required: true },
userId: { type: Number, required: true },
postTitle: { type: String, required: true },
postDescription: { type: String, required: true },
postType: { type: String, required: true },
likes: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("posts", postSchema);

class Posts {
static async grabPostFromDB() {
try {
const posts = await Post.find({}).sort({ createdAt: -1 });
return posts;
} catch (error) {
throw new Error(error);
}
}

static async grabFilteredPostsFromDB(filter) {
try {
const posts = await Post.find({ postType: filter }).sort({ createdAt: -1 });
return posts;
} catch (error) {
throw new Error(error);
}
}

static async grabLatestPostIdFromDB() {
try {
const latestPost = await Post.findOne().sort({ postId: -1 });
return latestPost.postId;
} catch (error) {
throw new Error(error);
}
}

static async addPostToDB(newPostId, userId, postTitle, postDescription, postType) {
try {
const newPost = await Post.create({ newPostId, userId, postTitle, postDescription, postType });
return newPost;
} catch (error) {
throw new Error(error);
}
}

static async grabPostInfoFromDB(postTitle) {
try {
const post = await Post.findOne({ postTitle });
return post;
} catch (error) {
throw new Error(error);
}
}

static async addToLikesForGivenPostInDB(postId) {
try {
const updatedPost = await Post.findOneAndUpdate({ postId }, { $inc: { likes: 1 } }, { new: true });
return updatedPost;
} catch (error) {
throw new Error(error);
}
}

static async subtractLikesForGivenPostInDB(postId) {
try {
const updatedPost = await Post.findOneAndUpdate({ postId }, { $inc: { likes: -1 } }, { new: true });
return updatedPost;
} catch (error) {
throw new Error(error);
}
}

static async grabPostFromDBBySearch(search) {
try {
const posts = await Post.find({ postTitle: { $regex: search, $options: "i" } }).sort({ createdAt: -1 });
return posts;
} catch (error) {
throw new Error(error);
}
}
}


module.exports = Posts

process.on('SIGINT', () => {
mongoose.connection.close();
process.exit();
});