/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('posts').del()
  await knex('comments').del()

  await knex('users').insert([
    { first_name: 'Evan', last_name: 'Lu', email: 'Evan4lfye@gmail.com', password: 'e' },
  ]);

  await knex('posts').insert([
    { post_description: 'I love Marcy', user_id: 1 },
  ]);

  await knex('comments').insert([
    { commentary: 'I love Marcy too', post_id: 1, user_id: 1 },
  ]);
};