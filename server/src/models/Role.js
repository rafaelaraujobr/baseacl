const knex = require("../config/database/index");

class Role {

    async create(data, permissions) {
        try {
            return await knex.transaction(async trx => {
                const role = await trx('role').insert({ ...data }).returning("*");
                let permissionsNew = []
                let permissionsReturn = []
                if (permissions.length > 0) {
                    permissions.forEach(element => {
                        permissionsNew.push({ role_id: role[0].id, permission_id: element.id })
                    });
                    let permission_roles = await trx('permissions_roles').insert(permissionsNew).returning("permission_id")
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
            return await knex('permissions_roles')
            .select(
                'role.id',
                'role.slug',
                'role.description',
                knex.raw("array_agg(permission.id) as permissions"))
            .innerJoin('role', 'permissions_roles.role_id', 'role.id')
            .innerJoin('permission', 'permissions_roles.permission_id', 'permission.id')
            .groupByRaw('role.id, role.slug, role.description')
            .where({ 'role.id': id })
        } catch (error) {
            console.log(error)
            return error
        }
    }
    
    async findAll() {
        try {
            return await knex('permissions_roles').select(
                'role.id',
                'role.slug',
                'role.description',
                knex.raw("array_agg(permission.id) as permissions")
            ).innerJoin('role', 'permissions_roles.role_id', 'role.id')
                .innerJoin('permission', 'permissions_roles.permission_id', 'permission.id')
                .groupByRaw('role.id, role.slug, role.description')

            // return await knex.raw(`SELECT role.id,
            //   role.slug,
            //   role.description,
            //   array_agg(permission.id) as permissions
            //   FROM permissions_roles
            //   INNER JOIN role ON role.id = permissions_roles.role_id
            //   INNER JOIN permission ON permission.id = permissions_roles.permission_id
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