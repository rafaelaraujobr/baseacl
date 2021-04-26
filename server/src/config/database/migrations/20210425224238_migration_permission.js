exports.up = (knex) =>
    knex.schema.createTable("permission", (table) => {
        table.uuid("id").primary().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 50).notNullable();
        table.string("description", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        console.log("Create table Permission");
    });

exports.down = (knex) => knex.schema.dropTable("permission");