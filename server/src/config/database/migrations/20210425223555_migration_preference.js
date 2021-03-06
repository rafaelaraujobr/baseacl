exports.up = knex =>
    knex.schema.createTable('preference', table => {
        //table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.increments('id').primary()
        table.integer('user_id').notNullable().unsigned();
        table.foreign('user_id')
            .references('user.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('theme').notNullable().defaultTo('light');
        table.string('language').notNullable().defaultTo('pt-br');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        console.log('Create table Preference')
    });

exports.down = knex => knex.schema.dropTable('preference');