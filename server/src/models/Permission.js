const knex = require("../config/database/index");

class Permission {

    async create(data) {
        try {
            const permission = await knex('permission').insert({ ...data }).returning("*");
            return permission[0]
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