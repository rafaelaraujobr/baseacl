const knex = require("../config/database/index");

class Role {

    async create(data, permissions) {
        try {
            return await knex.transaction(async trx => {
                const role = await trx('role').insert({ ...data }).returning("*");
                let permissions_roles = []
                let permissionsReturn = []
                if (permissions.length > 0) {
                    permissions.forEach(element => {
                        permissions_roles.push({ role_id: role[0].id, permission_id: element.id })
                    });
                    let permission_roles = await trx('permissions_roles').insert(permissions_roles).returning("permission_id")
                    permissionsReturn = await trx('permission').select().whereIn('id', permission_roles)
                }
                return { ...role[0], permissions: permissionsReturn }
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
                knex.raw(` (select case when role.id is not null then 
                    json_agg(json_build_object('id',permission.id,'slug',permission.slug,'description', permission.description, 'created_at', permission.created_at))
                   else null::json end from  permissions_roles 
                   LEFT JOIN permission ON permission.id = permissions_roles.permission_id
                   where permissions_roles.role_id = role.id GROUP BY role.id) as permissions`),
                'role.created_at')
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
                knex.raw(` (select case when role.id is not null then 
                    json_agg(json_build_object('id',permission.id,'slug',permission.slug,'description', permission.description, 'created_at', permission.created_at))
                   else null::json end from  permissions_roles 
                   LEFT JOIN permission ON permission.id = permissions_roles.permission_id
                   where permissions_roles.role_id = role.id GROUP BY role.id) as permissions`),
                'role.created_at');

            // return await knex('role').select(
            //     'role.id',
            //     'role.slug',
            //     'role.description',
            //     knex.raw("array_agg(json_build_object('id',permission.id,'slug',permission.slug,'description', permission.description, 'created_at', permission.created_at)) as permissions"),
            //     'role.created_at')
            //     .leftJoin('permissions_roles', 'permissions_roles.role_id', 'role.id')
            //     .leftJoin('permission', 'permissions_roles.permission_id', 'permission.id')
            //     .groupBy('role.id')

            // return await knex.raw(`SELECT role.id,
            //   role.slug,
            //   role.description,
            //   array_agg(permission.id) as permissions
            //   FROM role
            //   LEFT JOIN permissions_roles ON permissions_roles.role_id = role.id
            //   LEFT JOIN permission ON permission.id = permissions_roles.permission_id
            //   GROUP BY role.id,
            //   role.slug,
            //   role.description
            //      `)
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