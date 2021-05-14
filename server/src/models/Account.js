const knex = require("../config/database/index");

class Account {

    async create(data) {
        let { name, email, email_company, phone, phone_company, company, password_hash, slug } = data
        console.log(data)
        try {
            return await knex.transaction(async trx => {
                const legal_person_id = await trx('person').insert({ type: 'l', name: company, email: email_company, phone: phone_company });
                const private_person_id = await trx('person').insert({ type: 'p', name, email, phone });
                const realm_id = await trx('realm').insert({ person_id: parseInt(legal_person_id), slug });
                const user_id = await trx('user').insert({ realm_id, person_id: parseInt(private_person_id), password_hash });
                const role = await trx('role').select().where({ slug: 'administrador' }).first()
                await trx('address').insert({ person_id: parseInt(private_person_id) });
                await trx('preference').insert({ user_id: parseInt(user_id) });
                await trx('role_user').insert({ role_id: role.id, user_id: parseInt(user_id) });
                return await trx('user')
                    .select(
                        "user.id",
                        "user.realm_id as realm",
                        "person.name",
                        "person.email",
                    )
                    .innerJoin("person", "user.person_id", "person.id")
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