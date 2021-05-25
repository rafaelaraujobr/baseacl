exports.up = knex =>
    knex.schema.createTable('menu', table => {
        table.increments('id').primary()
        table.string('label').notNullable();
        table.string('slug').notNullable().unique();
        table.string('description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        console.log('Create table Menu')
    });

exports.down = knex => knex.schema.dropTable('menu');