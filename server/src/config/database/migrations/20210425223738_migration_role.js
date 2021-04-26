exports.up = (knex) =>
    knex.schema.createTable("role", (table) => {
        table.uuid("id").notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 50).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        console.log("Create table Role");
    });
exports.down = knex => knex.schema.dropTable("role");