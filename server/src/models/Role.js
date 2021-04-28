const knex = require("../config/database/index");

class Role {

    async create(data) {
        try {
            let role = await trx('role').insert({ ...data }).returning("*");
            return role[0]
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, data) {
        try {
            let role = await trx('role').update({ ...data }).where({ id });
            if (role == 1) return await this.findById(id);
            else throw 'error update';
        } catch (error) {
            console.log(error)
        }
    }

    async findById(id) {
        try {
            return await knex('role')
                .select(
                    "role.id",
                    "role.name"
                )
                .innerJoin("person", "user.person_id", "person.id")
                .innerJoin("preferences", "user.id", "preferences.user_id")
                .where("user.id", id)
                .first()

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