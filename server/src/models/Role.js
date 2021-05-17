const knex = require("../config/database/index");

class Role {
    async create(data, permissions) {
        try {
            return await knex.transaction(async trx => {
                const role_id = await trx('role').insert({ ...data });
                let permissions_roles = []
                if (permissions.length > 0) {
                    permissions.forEach(async element => {
                        permissions_roles.push({ role_id: parseInt(role_id), permission_id: element.id })
                    });
                    await trx('permission_role').insert(permissions_roles)
                }
                return await trx('role').select(
                    'role.id',
                    'role.slug',
                    'role.description',
                    knex.raw("(SELECT CASE WHEN permission_role.role_id IS NOT NULL THEN JSON_ARRAYAGG(JSON_OBJECT('id',permission.id,'slug',permission.slug,'description', permission.description, 'created_at', permission.created_at)) ELSE  JSON_ARRAY() END ) as permissions"),
                    'role.created_at')
                    .leftJoin('permission_role', 'permission_role.role_id', 'role.id')
                    .leftJoin('permission', 'permission_role.permission_id', 'permission.id')
                    .groupBy('role.id')
                    .where({ 'role.id': parseInt(role_id) }).first()
            })
        } catch (error) {
            console.log(error)
        }
    }
    async findById(id) {
        try {
            return await knex('role').select(
                'role.id',
                'role.slug',
                'role.description',
                knex.raw("(SELECT CASE WHEN permission_role.role_id IS NOT NULL THEN JSON_ARRAYAGG(JSON_OBJECT('id',permission.id,'slug',permission.slug,'description', permission.description, 'created_at', permission.created_at)) ELSE  JSON_ARRAY() END ) as permissions"),
                'role.created_at')
                .leftJoin('permission_role', 'permission_role.role_id', 'role.id')
                .leftJoin('permission', 'permission_role.permission_id', 'permission.id')
                .groupBy('role.id')
                .where({ 'role.id': id }).first()

        } catch (error) {
            console.log(error)
            return error
        }
    }
    async findAll() {
        try {
            return await knex('role').select(
                'role.id',
                'role.slug',
                'role.description',
                knex.raw("(SELECT CASE WHEN permission_role.role_id IS NOT NULL THEN JSON_ARRAYAGG(JSON_OBJECT('id',permission.id,'slug',permission.slug,'description', permission.description)) ELSE  JSON_ARRAY() END ) as permissions"),
            )
                .leftJoin('permission_role', 'permission_role.role_id', 'role.id')
                .leftJoin('permission', 'permission_role.permission_id', 'permission.id')
                .groupBy('role.id')

        } catch (error) {
            console.log(error)
            return error
        }

    }
    async findBySlug(slug) {
        try {
            return await knex('role').select().where({ slug }).first()
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async delete(id) {
        try {
            return await knex('role').where({ id }).del()
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = new Role();