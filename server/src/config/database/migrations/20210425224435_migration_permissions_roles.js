exports.up = knex => knex.schema.createTable('permissions_roles', table => {
    table.uuid("permission_id").notNullable()
    table.foreign('permission_id').references('permission.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid("role_id").notNullable()
    table.foreign('role_id').references('role.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.primary(['permission_id', 'role_id']);
    console.log('Create table Permissions Roles')
});

exports.down = knex => knex.schema.dropTable('permissions_roles');