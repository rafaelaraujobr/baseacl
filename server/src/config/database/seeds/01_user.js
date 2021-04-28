const bcryptjs = require("bcryptjs");

exports.seed = async (knex) => {
  try {
    return await knex.transaction(async (knex) => {
      await knex("person").del(); // clear table users
      await knex("user").del(); // clear table users
      await knex("preferences").del();
      // create people type 
      const person_id = await knex("person")
        .insert({
          id: '00000000-0000-0000-0000-000000000001',
          name: "Rafael Araujo",
          phone: "21982222393",
          email: "rflaraujodev@gmail.com.br",
        })
        .returning("id").toString();

      // create user
      const user_id = await knex("user")
        .insert({
          person_id,
          password_hash: await bcryptjs.hash("123456", 10),
        })
        .returning("id").toString();

      // create preference  
      const preferences_id = await knex("preference")
        .insert({ user_id})
        .returning("id").toString();


    });
  } catch (error) {
    console.log(error);
  }
};
