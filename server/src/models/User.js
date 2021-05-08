const knex = require("../config/database/index");

class User {

    async create(data) {
        let { name, email, phone, type, password_hash, roles } = data
        try {
            return await knex.transaction(async trx => {
                let person_id = await trx('person').insert({ type, name, email, phone });
                console.log("person_id => ",)
                let user_id = await trx('user').insert({ person_id: person_id[0], password_hash });
                await trx('preferences').insert({ user_id })
                if (roles && roles.length > 0) {
                    console.log('entrou')
                    let roles_users = []
                    roles.forEach(role_id => {
                        roles_users.push({ role_id, user_id: user_id[0] })
                    });
                    // console.log(roles_users)
                    await trx('roles_users').insert(roles_users)
                }
                return user_id[0]
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


    async findAll() {
        try {
            return await knex('user')
                .select(
                    "user.id",
                    "user.person_id",
                    "person.name",
                    "person.email",
                    "user.status",
                    "user.password_hash",
                    "preferences.theme",
                    "preferences.language"
                )
                .innerJoin("person", "user.person_id", "person.id")
                .innerJoin("preferences", "user.id", "preferences.user_id")
        } catch (error) {
            console.log(error)
            return error
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
                    "user.password_hash",
                    "preferences.theme",
                    "preferences.language"
                )
                .innerJoin("person", "user.person_id", "person.id")
                .innerJoin("preferences", "user.id", "preferences.user_id")
                .where("person.email", email)
                .first()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findById(id) {
        try {

            //   return await knex.raw(`SELECT usr.id, usr.person_id, prs.name, prf.language, array_agg(rol.id) as roles
            //   FROM public.user usr 
            //   LEFT JOIN public.roles_users rou ON rou.user_id = usr.id
            //   LEFT JOIN public.role rol ON rol.id = rou.role_id
            //   INNER JOIN public.person prs ON prs.id = usr.person_id
            //   INNER JOIN public.preferences prf ON prf.user_id = usr.id
            //   GROUP BY usr.id, prs.id, prf.id 
            //      `)

            return await knex('user')
            .select(
                "user.id",
                "user.person_id",
                "person.name",
                "person.email",
                "user.status",
                "user.password_hash",
                "preferences.theme",
                "preferences.language"
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