const { pool } = require('../db.js')

class Comment {
    static getCommentFromDB() {
        return pool.query('SELECT * FROM comments JOIN users ON comments.user_id = users.user_id ').then(results => { return results.rows })
    }
    static addCommentToDB(...args) {
        // return pool.query('INSERT INTO comments (commentary, post_id, user_id) VALUES ($1, $2, $3) RETURNING *', args).then(results => { return results.rows })
        // return pool.query('WITH inserted as (INSERT INTO comments (commentary, post_id, user_id) VALUES ($1, $2, $3)) SELECT * FROM comments JOIN users ON comments.user_id = users.user_id', args).then(results => { return results.rows })
        return pool.query('WITH inserted AS (INSERT INTO comments (commentary, post_id, user_id) VALUES ($1, $2, $3) RETURNING *) SELECT * FROM inserted JOIN users ON inserted.user_id = users.user_id', args).then(results => { return results.rows })

    }
}


module.exports = Comment