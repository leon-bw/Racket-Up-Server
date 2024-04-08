/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("matches", (table) => {
    table.increments("id");
    table.integer("user_id_1");
    table.integer("user_id_2");
    table.integer("sport_id");
    table.integer("court_id");
    table.integer("skill_level");
    table.integer("result");
    table.timestamp("create_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.raw("NULL ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("matches");
};
