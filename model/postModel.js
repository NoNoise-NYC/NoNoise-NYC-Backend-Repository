const pool = require('../db.js')

class Post {
  static grabPostFromDB () {
    return pool.query('SELECT users.username, post.* FROM users, post WHERE post.user_id = users.id ORDER BY post.post_id DESC')
  }

  static grabFilteredPostsFromDB (filter) {
    return pool.query('SELECT users.username, post.* FROM users, post WHERE post.post_type = $1 AND users.id = post.user_id', [filter])
  }

  static grabLatestPostIdFromDB () {
    return pool.query('SELECT MAX(post_id) FROM post')
  }

  static addPostToDB (newPostId, userId, postTitle, postDescription, postType) {
    return pool.query('INSERT INTO post (post_id, user_id, post_title, post_description, post_type, likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [newPostId, userId, postTitle, postDescription, postType, 0])
  }

  static grabPostInfoFromDB (username, postTitle) {
    return pool.query('SELECT users.username, post.* FROM users, post WHERE users.id = post.user_id AND users.username = $1 AND post.post_title = $2;', [username, postTitle])
  }

  static addToLikesForGivenPostInDB (postId) {
    return pool.query('UPDATE post SET likes = likes + 1 WHERE post_id = $1 RETURNING *', [postId])
  }

  static subtractLikesForGivenPostInDB (postId) {
    return pool.query('UPDATE post SET likes = likes - 1 WHERE post_id = $1 RETURNING *', [postId])
  }

  static grabPostFromDBBySearch(search) {
    return pool.query(`SELECT * FROM post WHERE post_title ILIKE '%'||$1||'%'`, [search])
  }

  static grabPostFromDBOrderByComment() {
    return pool.query('SELECT * FROM post')
  }

  static grabPostFromDBOrderByLike() {
    return pool.query('SELECT * FROM post')
  }
}

module.exports = Post
