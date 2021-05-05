const knex = require("../config/database/index");

class User {

    async create(data) {
        let { name, email, phone, type, password_hash, roles } = data
        try {
            return await knex.transaction(async trx => {
                let person = await trx('person').insert({ type, name, email, phone }).returning("*");
                delete person[0].type
                if (!person[0].phone) delete person[0].phone
                let user_id = await trx('user').insert({ person_id: person[0].id, password_hash }).returning("id");
                let roles_user = []
                roles.forEach(idRole => {
                    roles_user.push({ role_id: idRole, user_id: user_id[0] })
                });
                await trx('roles_users').insert(roles_user)
                await trx('preferences').insert({ user_id: user_id[0] }).returning(['theme', 'language'])
                return await this.findById(user_id[0])
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

            return await knex.from('user')
                .select(
                    "user.id",
                    "user.person_id",
                    // "person.name",
                    "user.status",
                    "user.password_hash",
                    // "preferences.theme",
                    // "preferences.language",
                    // "role.id as role_id"
                    knex.raw(`(select
                        json_agg(json_build_object('id',role.id,'slug',role.slug,'description', role.description, 'created_at', role.created_at))
                        from roles_users 
                       LEFT JOIN role ON role.id = roles_users.role_id
                       where roles_users.user_id = user.id GROUP BY user.id) as roles`),
                    'user.created_at')
            // .innerJoin("person", "person.id", "user.person_id")
            // // .innerJoin("preferences", "user.id", "preferences.user_id")
            // .leftJoin('roles_users', 'roles_users.user_id', 'user.id')
            // .leftJoin('role', 'roles_users.role_id', 'role.id')
            // .groupBy('user.id, person.name')

            return await knex('user').select(
                "user.id",
                "user.person_id",
                // "person.name",
                // "person.email",
                "user.status",
                "user.password_hash",
                // "preferences.theme",
                // "preferences.language",
                knex.raw(` (select case when user.id is not null then 
                    json_agg(json_build_object('id',role.id,'slug',role.slug,'description', role.description, 'created_at', role.created_at))
                   else null::json end from roles_users
                   INNER JOIN role ON role.id = roles_users.role_id
                   where roles_users.user_id = user.id GROUP BY user.id) as roles`),
                'user.created_at')
            // .innerJoin("person", "user.person_id", "person.id")
            // .innerJoin("preferences", "user.id", "preferences.user_id")
            // .innerJoin('roles_users','user.id', 'roles_users.user_id')
            // .innerJoin('role', 'roles_users.role_id', 'role.id')
            // .first()


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