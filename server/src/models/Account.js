const knex = require("../config/database/index");

class Account {

    async create(data) {
        let { name, email, phone, type, password_hash, roles, slug } = data
        try {
            return await knex.transaction(async trx => {
                const person_id = await trx('person').insert({ type, name, email, phone });
                const user_id = await trx('user').insert({ person_id: parseInt(person_id), password_hash });
                await trx('address').insert({ person_id: parseInt(person_id) });
                await trx('preference').insert({ user_id: parseInt(user_id) })
                if (roles.length > 0) {
                    let roles_users = []
                    roles.forEach(role_id => {
                        roles_users.push({ role_id, user_id: parseInt(user_id) })
                    });
                    await trx('roles_users').insert(roles_users)
                }
                return await trx('user')
                    .select(
                        "user.id",
                        "user.person_id",
                        "person.name",
                        "person.email",
                        "user.status",
                        "user.password_hash",
                        "preference.theme",
                        "preference.language",
                        knex.raw(`(select JSON_ARRAYAGG('id',address.id,'country', address.country ) as adresses)`
                        ),
                        knex.raw("(SELECT CASE WHEN roles_user.role_id IS NOT NULL THEN JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'slug',role.slug,'description', role.description, 'created_at', role.created_at)) ELSE  JSON_ARRAY() END ) as roles"),
                    )
                    .leftJoin('roles_user', 'roles_user.user_id', 'user.id')
                    .leftJoin('role', 'roles_user.role_id', 'role.id')
                    .innerJoin("address", "address.person_id", "person.id")
                    .innerJoin("person", "user.person_id", "person.id")
                    .innerJoin("preference", "user.id", "preference.user_id")
                    .groupBy('user.id')
                    .where("user.id", parseInt(user_id))
                    .first()
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new Account();