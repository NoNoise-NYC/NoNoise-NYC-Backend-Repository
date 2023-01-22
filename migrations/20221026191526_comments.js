/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('comment_id').primary();
        table.string('commentary').notNullable;
        table.timestamp("creation_Date").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updation_Date").notNullable().defaultTo(knex.fn.now());
        table.integer('post_id').notNullable;
        table.foreign('post_id').references('post_id').inTable('posts');
        table.integer('user_id').notNullable;
        table.foreign('user_id').references('user_id').inTable('users');
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
