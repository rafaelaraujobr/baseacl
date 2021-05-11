exports.up = knex =>
    knex.schema.createTable('realm', table => {
        table.increments('id').primary()
        table.integer('person_id').notNullable().unsigned();
        table.foreign('person_id')
            .references('person.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('slug').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        console.log('Create table Realm')
    });

exports.down = knex => knex.schema.dropTable('realm');