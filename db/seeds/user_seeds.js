/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const users = require("../seed-data/01_user");
const matches = require("../seed-data/02_match");


exports.seed = async function(knex) {

  await knex("users").del();
  await knex("users").insert(users);
  await knex("matches").del();
  await knex("matches").insert(matches);
};
