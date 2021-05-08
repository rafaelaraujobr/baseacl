
exports.up = (knex) => knex.schema.createTable("person", (table) => {
  //table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw("uuid_to_bin(uuid())"));
  table.increments('id').primary();
  table.string("type", 1).notNullable().defaultTo("f");
  table.string("name", 150).notNullable();
  table.string("email", 150).notNullable();
  table.string("phone");
  table.unique(["email", "type"]);
  table.timestamp("created_at").defaultTo(knex.fn.now());
  console.log("Create table People");
});

exports.down = (knex) => knex.schema.dropTable("person");
