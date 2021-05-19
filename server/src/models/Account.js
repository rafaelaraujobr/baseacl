const knex = require("../config/database/index");

class Account {

    async create(data) {
        let { name, last_name, email, phone, company_name, password_hash, slug } = data
        console.log(data)
        try {
            return await knex.transaction(async trx => {
                const legal_person_id = await trx('person').insert({ type: 'l', email, phone });
                await trx('legal_person').insert({ person_id: parseInt(legal_person_id), name, last_name });
                const private_person_id = await trx('person').insert({ type: 'p', email, phone });
                await trx('private_person').insert({ person_id: parseInt(private_person_id), company_name });
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
                        knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                        "person.email",
                    )
                    .innerJoin("person", "user.person_id", "person.id")
                    .innerJoin('private_person', 'private_person.person_id', 'person.id')
                    .groupBy('user.id')
                    .where("user.id", parseInt(user_id))
                    .first()
            })
        } catch (error) {
            console.log(error)
        }
    }
    async checkAuth(user_id, token,) {
        try {
            return await knex.transaction(async (trx) => {
                return await trx('authentication').select(
                    "user.id",
                    knex.raw(`(SELECT JSON_OBJECT('id',realm.id,'slug', realm.slug, 'name', legal_person.company_name,  'phone',person_realm.phone, 'email',person_realm.email)) as realm`),
                    knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                    "person.email",
                    knex.raw(`(SELECT JSON_OBJECT('theme', "preference.theme",'language',  "preference.language")) as preferences`),
                    knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                        JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'description', role.description))
                         ELSE  JSON_ARRAY() END ) as roles`),
                    "authentication.token")
                    .innerJoin("user", "authentication.user_id", "user.id")
                    .leftJoin('role_user', 'role_user.user_id', 'user.id')
                    .leftJoin('role', 'role_user.role_id', 'role.id')
                    .innerJoin("person", "user.person_id", "person.id")
                    .innerJoin("realm", "user.realm_id", "realm.id")
                    .innerJoin("person as person_realm", "realm.person_id", " person_realm.id")
                    .leftJoin('legal_person', 'legal_person.person_id', 'person_realm.id')
                    .leftJoin('private_person', 'private_person.person_id', 'person.id')
                    .innerJoin("preference", "user.id", "preference.user_id")
                    .groupBy('user.id')
                    .where({ 'authentication.user_id': user_id, 'authentication.token': token })
                    .first();
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async createAuth(data) {
        const { token, user_id, is_mobile, is_desktop, is_electron, is_smart_tv, source } = data;
        try {
            return await knex.transaction(async (knex) => {
                await knex.delete().where({ user_id }).table("authentication");
                return await knex.insert({ user_id, token, is_mobile, is_desktop, is_electron, is_smart_tv, source }).table("authentication");
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteAuthentication(user_id, token) {
        try {
            return await knex
                .delete()
                .where({ user_id, token })
                .table("authentication");
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}

module.exports = new Account();