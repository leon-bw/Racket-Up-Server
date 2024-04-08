/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
<<<<<<< HEAD
    table.string("password").notNullable();
    table.integer("skill_level").notNullable();
    table.string("role");
=======
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("sport").notNullable();
    table.integer("skill_level").notNullable();
    table.integer("role");
>>>>>>> features/add-database
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
