
exports.up = (knex) =>
    knex.schema.createTable("address", (table) => {
        table.increments('id').primary()
        table.integer('person_id').notNullable().unsigned();
        table.foreign('person_id')
            .references('person.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string("zip_code");
        table.string("public_place");
        table.string("number");
        table.string("complement");
        table.string("district");
        table.string("city");
        table.string("state");
        table.string("country").defaultTo("brasil");
        table.string("gps_lat");
        table.string("gps_log");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        console.log("Create table Address");
    });

exports.down = (knex) => knex.schema.dropTable("address");