const { pool } = require('../db.js')

class Post {
    static getPostFromDB() {
        return pool.query('SELECT * FROM posts JOIN users ON posts.user_id = users.user_id ORDER BY post_id').then(results => { return results.rows })
    }
    static addPostFromDB(...args) {
        // return pool.query('INSERT INTO posts (post_description, user_id) VALUES ($1, $2) RETURNING *', args).then(results => { return results.rows })
        // return pool.query('WITH inserted as (INSERT INTO posts (post_description, user_id) VALUES ($1, $2) RETURNING *) SELECT * FROM posts JOIN users ON posts.user_id = users.user_id', args).then(results => { return results.rows })
        // return pool.query('WITH inserted as (INSERT INTO posts (post_description, user_id) VALUES ($1, $2) RETURNING *) SELECT * FROM posts JOIN users ON posts.user_id = users.user_id', args).then(results => { return results.rows })
        return pool.query('WITH inserted AS (INSERT INTO posts (post_description, user_id) VALUES ($1, $2) RETURNING *) SELECT * FROM inserted JOIN users ON inserted.user_id = users.user_id', args).then(results => { return results.rows })
 
//                 SELECT inserted.*, fit.*
//             FROM inserted
// INNER JOIN fit ON inserted.fit_id = fit.id
        //     WITH inserted as (
        //         INSERT INTO food_update(food_id, value)
        //         values(1, 12) RETURNING id, food_id 
        //     ) 
        //     SELECT * 
        //     FROM inserted 
        //     INNER JOIN food 
        //         ON food.id = inserted.food_id
    }
}


module.exports = Post