const knex = require("../config/database/index");

class User {
    async create(data) {
        let { name, last_name, email, phone, type, password_hash, roles, realm_id } = data
        try {
            return await knex.transaction(async trx => {
                const person_id = await trx('person').insert({ type, email, phone });
                await trx('private_person').insert({ person_id: parseInt(person_id), name, last_name });
                const user_id = await trx('user').insert({ person_id: parseInt(person_id), password_hash, realm_id });
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
                        knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                        "person.email",
                        "user.status",
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
                    .innerJoin('private_person', 'private_person.person_id', 'person.id')
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

    async findAll(realm) {
        try {
            return await knex('user')
                .select(
                    "user.id",
                    "user.realm_id as realm",
                    knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                    "person.email",
                    "person.phone",
                    "user.status",
                    knex.raw(`(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',address.id,'zip_code', address.zip_code,
                'public_place', address.public_place, 'number', address.number, 'complement', address.complement,
                'district', address.district,'state', address.state, 'country', address.country, 
                'gps_lat', address.gps_lat,'gps_log', address.gps_log ))) as adresses`),
                    knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                    JSON_ARRAYAGG(JSON_OBJECT('id',role.id,'slug',role.slug,'description', role.description)) ELSE  JSON_ARRAY() END ) as roles`),
                )
                .leftJoin('role_user', 'role_user.user_id', 'user.id')
                .leftJoin('role', 'role_user.role_id', 'role.id')
                .innerJoin("address", "user.person_id", "address.person_id")
                .innerJoin("person", "user.person_id", "person.id")
                .leftJoin('private_person', 'private_person.person_id', 'person.id')
                .groupBy('user.id')
                .where("user.realm_id", realm)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async findByEmail(email, realm) {
        try {
            return await knex('user')
                .select(
                    "user.id",
                    "user.realm_id as realm",
                    "user.password_hash as password",
                    knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                    "person.email",
                    "preference.theme",
                    "preference.language",
                    "user.status",
                    knex.raw(`(SELECT CASE WHEN role_user.role_id IS NOT NULL THEN 
                        JSON_ARRAYAGG(JSON_OBJECT('slug',role.slug,'description', role.description)) ELSE  JSON_ARRAY() END ) as roles`)
                )
                .innerJoin("person", "user.person_id", "person.id")
                .innerJoin("realm", "user.realm_id", "realm.id")
                .innerJoin("preference", "user.id", "preference.user_id")
                .leftJoin('private_person', 'private_person.person_id', 'person.id')
                .leftJoin('role_user', 'role_user.user_id', 'user.id')
                .leftJoin('role', 'role_user.role_id', 'role.id')
                .groupBy('user.id')
                .where('person.email', email)
                .modify((queryBuilder) => {
                    if (realm) queryBuilder.where('user.realm_id', realm);
                })
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
                    knex.raw(`CONCAT (private_person.name, ' ', private_person.last_name) as name`),
                    "person.email",
                    "person.phone",
                    "user.status",
                    "preference.theme",
                    "preference.language",
                    knex.raw(`(SELECT JSON_OBJECT('id',realm.id,'slug', realm.slug, 'name', legal_person.company_name,  'phone',person_realm.phone, 'email',person_realm.email)) as realm`),
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
                .leftJoin('legal_person', 'legal_person.person_id', 'person_realm.id')
                .leftJoin('private_person', 'private_person.person_id', 'person.id')
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