const knex = require("../config/database/index");

class Permission {

    async create(data) {
        try {
            let permission_id = await knex('permission').insert({ ...data });
            return this.findById(parseInt(permission_id))
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, data) {
        try {
            let permission = await knex('permission').update({ ...data }).where({ id });
            if (permission == 1) return await this.findById(id);
            else throw 'error update';
        } catch (error) {
            console.log(error)
        }
    }

    async findAll() {
        try {
            return await knex('permission').select()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findByRoles(roles) {
        try {
            return await knex('role').select(
                knex.raw("(SELECT CASE WHEN permission_role.role_id IS NOT NULL THEN JSON_ARRAYAGG(permission.id) ELSE  JSON_ARRAY() END ) as permissions"))
                .leftJoin('permission_role', 'permission_role.role_id', 'role.id')
                .leftJoin('permission', 'permission_role.permission_id', 'permission.id')
                .groupBy('role.id')
                .whereIn('role.id', roles)
        } catch (error) {
            console.log(error)
            return error
        }

    }

    async findByUser(id) {
        try {
            return await knex('user').select(
                knex.raw(`(SELECT CASE WHEN permission_role.role_id IS NOT NULL 
                    THEN JSON_ARRAYAGG(JSON_OBJECT('id',permission.id,'slug',permission.slug,'description', permission.description)) 
                    ELSE  JSON_ARRAY() END ) as permissions`),
            )
                .leftJoin('role_user', 'role_user.user_id', 'user.id')
                .leftJoin('role', 'role_user.role_id', 'role.id')
                .leftJoin('permission_role', 'permission_role.role_id', 'role.id')
                .leftJoin('permission', 'permission_role.permission_id', 'permission.id')
                .groupBy('user.id')
                .where('user.id', id).first()
        } catch (error) {
            console.log(error)
            return error
        }

    }

    async findById(id) {
        try {
            return await knex('permission').select().where({ id }).first()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findByIds(ids) {
        try {
            return await knex('permission').select().whereIn('id', ids)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findBySlug(slug) {
        try {
            return await knex('permission').select().where({ slug }).first()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async delete(id) {
        try {
            return await knex('permission').where({ id }).del()
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = new Permission();


