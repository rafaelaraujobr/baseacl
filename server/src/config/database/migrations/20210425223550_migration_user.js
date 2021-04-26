exports.up = knex => knex.schema.createTable('user', table => {
    table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.integer('status').notNullable().defaultTo(1);

    table.uuid('person_id').notNullable();
    table.foreign('person_id').references('person.id').onDelete('CASCADE').onUpdate('CASCADE');

    table.string('password_hash', 255).notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    console.log('Create table User')
});

exports.down = knex => knex.schema.dropTable('user');