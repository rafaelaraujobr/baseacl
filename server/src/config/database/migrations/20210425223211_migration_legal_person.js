exports.up = knex =>
    knex.schema.createTable('legal_person', table => {
        table.increments('id').primary()
        table.integer('person_id').notNullable().unsigned();
        table.foreign('person_id')
            .references('person.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        console.log('Create table Legal Person')
    });

exports.down = knex => knex.schema.dropTable('legal_person');