const knex = require("../config/database/index");

class User {

    async create(data) {
        let { name, email, phone, type, password_hash } = data
        try {
            return await knex.transaction(async trx => {
                let person = await trx('person').insert({ type, name, email, phone }).returning("*");
                delete person[0].type
                if (!person[0].phone) delete person[0].phone
                let user_id = await trx('user').insert({ person_id: person[0].id, password_hash }).returning("id");
                let preferences = await trx('preferences').insert({user_id}).returning("theme, language")
                return { ...person[0], ...preferences[0], id: user_id[0], person_id: person[0].id }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, data) {
        try {
            return await knex.transaction(async trx => {
                let user = await trx('user').select().where({ id }).first();
                let person = await trx('person').update({ ...data }).where({ id: user.person_id });
                if (person == 1) return await this.findById(id);
                else throw 'error update';
            })
        } catch (error) {
            console.log(error)
        }
    }

    async findByEmail(email) {
        try {
            return await knex('user')
                .select(
                    "user.id",
                    "user.person_id",
                    "person.name",
                    "person.email",
                    "user.status",
                    "user.password_hash"
                )
                .innerJoin("person", "user.person_id", "person.id")
                .where("person.email", email)
                .first()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findById(id) {
        try {
            return await knex('user')
                .select(
                    "user.id",
                    "user.person_id",
                    "person.name",
                    "person.email",
                    "user.status",
                    "user.password_hash"
                )
                .innerJoin("person", "user.person_id", "person.id")
                .where("user.id", id)
                .first()

        } catch (error) {
            console.log(error)
            return error
        }
    }

    async disable(id, status) {
        try {
            return await knex('user').where({ id }).update({ status })
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async delete(id) {
        try {
            return await knex('user').where({ id }).del()
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = new User();