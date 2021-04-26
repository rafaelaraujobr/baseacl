module.exports = {
  client: process.env.DB_TYPE || "pg",
  connection: {
    database: process.env.DB_NAME || "baseacl",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "1230",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/src/config/database/migrations`,
  },
  seeds: {
    directory: `${__dirname}/src/config/database/seeds`,
  },
};