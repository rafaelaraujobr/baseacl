exports.up = knex =>
    knex.schema.createTable('preferences', table => {
        table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid('user_id').notNullable();
        table.foreign('user_id').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('theme').notNullable().defaultTo('light');
        table.string('language').notNullable().defaultTo('pt-br');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        console.log('Create table Preferences')
    });

exports.down = knex => knex.schema.dropTable('preferences');