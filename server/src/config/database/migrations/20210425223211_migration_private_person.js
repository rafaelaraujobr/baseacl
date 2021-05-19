exports.up = knex =>
    knex.schema.createTable('private_person', table => {
        table.increments('id').primary()
        table.integer('person_id').notNullable().unsigned();
        table.foreign('person_id')
            .references('person.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('name').notNullable();
        table.string('last_name').notNullable();
        console.log('Create table Private Person')
    });

exports.down = knex => knex.schema.dropTable('private_person');