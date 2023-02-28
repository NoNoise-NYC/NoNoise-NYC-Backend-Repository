const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Users } = require('../model/userModel');

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    unique: true
  },
  user_id: {
    type: String,
    required: true
  },
  post_title: {
    type: String,
    required: true
  },
  post_description: {
    type: String,
    required: true
  },
  post_type: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }]
});

postSchema.plugin(AutoIncrement, { inc_field: 'postId' });
const Post = mongoose.model('Post', postSchema);

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
      const posts = await Post.find({ id: filter }).sort({ createdAt: -1 });
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

  static async addPostToDB(user_id, post_title, post_description, post_type, likes) {
    try {
      const newPost = await Post.create({ user_id, post_title, post_description, post_type, likes });
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

  static async removePost (postId){
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      return deletedPost;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

module.exports = { Posts, Post };

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit();
});
