/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const users = require("../seed-data/01_user");
const matches = require("../seed-data/02_match");


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  // await knex('table_name').insert([
  //   {id: 1, colName: 'rowValue1'},
  //   {id: 2, colName: 'rowValue2'},
  //   {id: 3, colName: 'rowValue3'}
  // ]);
  await knex("users").del();
  await knex("users").insert(users);
  await knex("match").del();
  await knex("match").insert(matches);
};
