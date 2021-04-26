const bcryptjs = require("bcryptjs");

exports.seed = async (knex) => {
  try {
    return await knex.transaction(async (knex) => {
      await knex("person").del(); // clear table users
      await knex("user").del(); // clear table users
      // create people type 
      const person_id = await knex("person")
        .insert({
          id: '00000000-0000-0000-0000-000000000001',
          name: "Rafael Araujo",
          phone: "21982222393",
          email: "rflaraujodev@gmail.com.br",
        })
        .returning("id");

      // create user
      const user_id = await knex("user")
        .insert({
          person_id: person_id.toString(),
          password_hash: await bcryptjs.hash("123456", 10),
        })
        .returning("id");
    });
  } catch (error) {
    console.log(error);
  }
};
