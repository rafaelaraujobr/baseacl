const bcryptjs = require("bcryptjs");

exports.seed = async (knex) => {
  try {
    return await knex.transaction(async (knex) => {
      await knex("person").del(); // clear table users
      await knex("user").del(); // clear table users
      await knex("preferences").del(); // create people type 

      // create person
      const person_id = await knex("person")
        .insert({
          name: "Rafael Araujo",
          phone: "21982222393",
          email: "rflaraujodev@gmail.com.br",
        });

      // create user
      const user_id = await knex("user")
        .insert({
          person_id: person_id[0],
          password_hash: await bcryptjs.hash("123456", 10),
        })

      // create preference  
      await knex("preference")
        .insert({ user_id: user_id[0] })

    });
  } catch (error) {
    console.log(error);
  }
};
