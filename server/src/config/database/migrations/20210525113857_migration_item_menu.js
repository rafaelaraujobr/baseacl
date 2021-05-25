exports.up = knex =>
    knex.schema.createTable('item_menu', table => {
        table.increments('id').primary()
        table.integer('menu_id').notNullable().unsigned();
        table.foreign('menu_id')
            .references('menu.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('type').notNullable();
        table.string('label').notNullable();
        table.string('description');
        table.string('icon');
        table.string('path').notNullable().unique();
        table.integer('parent_id').unsigned();
        table.foreign('parent_id').references('menu.id');
        table.integer('permission_id').notNullable().unsigned();
        table.foreign('permission_id').references('permission.id')
        table.timestamp('created_at').defaultTo(knex.fn.now());
        console.log('Create table Item menu')
    });

exports.down = knex => knex.schema.dropTable('item_menu');