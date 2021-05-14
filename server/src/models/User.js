const knex = require("../config/database/index");

class User {
    async create(data) {
        let { name, email, phone, type, password_hash, roles } = data
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
                    await trx('role_user').insert(roles_users)
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
                        knex.raw(`(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',address.id,'zip_code', address.zip_code,
                        'public_place', address.public_place, 'number', address.number, 'complement', address.complement,
                        'district', address.district,'state', address.state, 'country', address.country, 
                        'gps_lat', address.gps_lat,'gps_log', address.gps_log ))) as adresses`),
                        knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                            JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'slug',role.slug,'description', role.description, 
                            'created_at', role.created_at)) ELSE  JSON_ARRAY() END ) as roles`),
                    )
                    .leftJoin('role_user', 'role_user.user_id', 'user.id')
                    .leftJoin('role', 'role_user.role_id', 'role.id')
                    .innerJoin("address", "user.person_id", "address.person_id")
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
                    "user.realm_id as realm",
                    "person.name",
                    "person.email",
                    "person.phone",
                    "user.status",
                    knex.raw(`(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',address.id,'zip_code', address.zip_code,
                'public_place', address.public_place, 'number', address.number, 'complement', address.complement,
                'district', address.district,'state', address.state, 'country', address.country, 
                'gps_lat', address.gps_lat,'gps_log', address.gps_log ))) as adresses`),
                    knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                    JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'slug',role.slug,'description', role.description, 
                    'created_at', role.created_at)) ELSE  JSON_ARRAY() END ) as roles`),
                )
                .leftJoin('role_user', 'role_user.user_id', 'user.id')
                .leftJoin('role', 'role_user.role_id', 'role.id')
                .innerJoin("address", "user.person_id", "address.person_id")
                .innerJoin("person", "user.person_id", "person.id")
                .groupBy('user.id')
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
                    "user.realm_id as realm",
                    "user.password_hash as password",
                    "person.name",
                    "person.email",
                    "preference.theme",
                    "preference.language",
                    "user.status")
                .innerJoin("person", "user.person_id", "person.id")
                .innerJoin("realm", "user.realm_id", "realm.id")
                .innerJoin("preference", "user.id", "preference.user_id")
                .groupBy('user.id')
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
                    "person.phone",
                    "user.status",
                    "preference.theme",
                    "preference.language",
                    knex.raw(`(SELECT JSON_OBJECT('id',realm.id,'slug', realm.slug, 'name', person_realm.name, 'phone',person_realm.phone, 'email',person_realm.email)) as realm`),
                    knex.raw(`(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',address.id,'zip_code', address.zip_code,
            'public_place', address.public_place, 'number', address.number, 'complement', address.complement,
            'district', address.district,'state', address.state, 'country', address.country, 
            'gps_lat', address.gps_lat,'gps_log', address.gps_log ))) as adresses`),
                    knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'slug',role.slug,'description', role.description, 
                'created_at', role.created_at)) ELSE  JSON_ARRAY() END ) as roles`),
                )
                .leftJoin('role_user', 'role_user.user_id', 'user.id')
                .leftJoin('role', 'role_user.role_id', 'role.id')
                .innerJoin("address", "user.person_id", "address.person_id")
                .innerJoin("person", "user.person_id", "person.id")
                .innerJoin("realm", "user.realm_id", "realm.id")
                .innerJoin("person as person_realm", "realm.person_id", " person_realm.id")
                .innerJoin("preference", "user.id", "preference.user_id")
                .groupBy('user.id')
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