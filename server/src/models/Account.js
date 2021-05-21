const knex = require("../config/database/index");

class Account {

    async createAccount(data) {
        let { name, last_name, email, phone, company_name, password_hash, slug } = data
        try {
            return await knex.transaction(async trx => {
                const legal_person_id = await trx('person').insert({ type: 'l', email, phone });
                await trx('legal_person').insert({ person_id: parseInt(legal_person_id), company_name });
                const private_person_id = await trx('person').insert({ type: 'p', email, phone });
                await trx('private_person').insert({ person_id: parseInt(private_person_id), name, last_name });
                const realm_id = await trx('realm').insert({ person_id: parseInt(legal_person_id), slug });
                const user_id = await trx('user').insert({ realm_id, person_id: parseInt(private_person_id), password_hash });
                const role = await trx('role').select().where({ slug: 'admin' }).first()
                await trx('address').insert({ person_id: parseInt(private_person_id) });
                await trx('preference').insert({ user_id: parseInt(user_id) });
                await trx('role_user').insert({ role_id: role.id, user_id: parseInt(user_id) });
                return await trx('user')
                    .select(
                        "user.id",
                        "legal_person.company_name as company_name",
                        knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                        "person.email",
                    )
                    .innerJoin("realm", "user.realm_id", "realm.id")
                    .innerJoin("person", "user.person_id", "person.id")
                    .innerJoin("person as person_realm", "realm.person_id", " person_realm.id")
                    .innerJoin('private_person', 'private_person.person_id', 'person.id')
                    .leftJoin('legal_person', 'legal_person.person_id', 'person_realm.id')
                    .groupBy('user.id')
                    .where("user.id", parseInt(user_id))
                    .first()
            })
        } catch (error) {
            console.log(error)
        }
    }
    async checkSession(user_id, token) {
        try {
            return await knex.transaction(async (trx) => {
                return await trx('session').select(
                    "user.id",
                    knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                    "person.email",
                    knex.raw(`(SELECT JSON_OBJECT('id',realm.id, 'name', legal_person.company_name)) as realm`),
                    knex.raw(`(SELECT JSON_OBJECT('theme', "preference.theme",'language',  "preference.language")) as preferences`),
                    knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                        JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'description', role.description))
                         ELSE  JSON_ARRAY() END ) as roles`),
                    "session.token")
                    .innerJoin("user", "session.user_id", "user.id")
                    .leftJoin('role_user', 'role_user.user_id', 'user.id')
                    .leftJoin('role', 'role_user.role_id', 'role.id')
                    .innerJoin("person", "user.person_id", "person.id")
                    .innerJoin("realm", "user.realm_id", "realm.id")
                    .innerJoin("person as person_realm", "realm.person_id", " person_realm.id")
                    .leftJoin('legal_person', 'legal_person.person_id', 'person_realm.id')
                    .leftJoin('private_person', 'private_person.person_id', 'person.id')
                    .innerJoin("preference", "user.id", "preference.user_id")
                    .groupBy('user.id')
                    .where({ 'session.user_id': user_id, 'session.token': token })
                    .first();
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async createSession(data) {
        const { token, user_id, is_mobile, is_desktop, expires_in, is_electron, source } = data;
        try {
            return await knex.transaction(async (trx) => {
                await trx.delete().where({ user_id }).table("session");
                return await trx.insert({ user_id, token, is_mobile, is_desktop, expires_in, is_electron, source }).table("session");
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteSession(user_id, token) {
        try {
            return await knex
                .delete()
                .where({ user_id, token })
                .table("session");
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}

module.exports = new Account();