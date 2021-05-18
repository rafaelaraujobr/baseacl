exports.up = (knex) =>
    knex.schema.createTable("authentication", (table) => {
        table.increments('id').primary()
        table.integer('user_id').notNullable().unsigned();
        table
            .foreign("user_id")
            .references("user.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.integer("is_mobile").defaultTo(0);
        table.integer("is_desktop").defaultTo(0);
        table.integer("is_electron").defaultTo(0);
        table.integer("is_smart_tv").defaultTo(0);
        table.string("source");
        table.string("token", 180).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        console.log("Create table Authentication");
    });

exports.down = (knex) => knex.schema.dropTable("authentication");