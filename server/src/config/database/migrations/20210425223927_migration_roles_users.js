exports.up = knex => knex.schema.createTable('roles_users', table => {
    table.integer('user_id').unsigned()
    table.foreign('user_id')
        .references('user.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table.integer('role_id').unsigned()
    table.foreign('role_id')
        .references('role.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table.primary(['user_id', 'role_id']);
    console.log('Create table Roles Users')
});

exports.down = knex => knex.schema.dropTable('roles_users');