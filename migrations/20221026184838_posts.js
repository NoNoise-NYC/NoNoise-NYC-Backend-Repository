/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('post_id').primary();
        table.string('post_description').notNullable;
        table.timestamp("creation_Date").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updation_Date").notNullable().defaultTo(knex.fn.now());
        table.integer('user_id').notNullable;
        table.foreign('user_id').references('user_id').inTable('users');
    })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};