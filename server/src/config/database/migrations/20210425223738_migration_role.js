exports.up = (knex) =>
    knex.schema.createTable("role", (table) => {
        table.uuid("id").notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("slug", 50).notNullable();
        table.string("description", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        console.log("Create table Role");
    });
exports.down = knex => knex.schema.dropTable("role");