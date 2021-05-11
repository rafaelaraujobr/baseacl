exports.up = knex =>
    knex.schema.createTable('permission_role', table => {
        table.integer('permission_id').unsigned()
        table.foreign('permission_id')
            .references('permission.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('role_id').unsigned()
        table.foreign('role_id')
            .references('role.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.primary(['permission_id', 'role_id']);
        console.log('Create table Permission Role')
    });

exports.down = knex => knex.schema.dropTable('permission_role');