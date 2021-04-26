exports.seed = async (knex) => {
  try {
    await knex.transaction(async (knex) => {
      await knex("role").del(); // clear table roles
      await knex("role").insert([
        { name: "public" }, // acesso publico
        { name: "guest" }, // acesso de nao registrados
        { name: "registered" }, // acesso de usuario registrados
        { name: "manager" }, // acesso gerencial
        { name: "administrator" }, // acesso administrativo
        { name: "super-user" }, // acesso total
      ]);
    });
    // create roles
  } catch (error) {
    console.log(error);
  }
};
