module.exports = {
  client: process.env.DB_TYPE || "mysql2",
  connection: {
    database: process.env.DB_NAME || "base_acl",
    user: process.env.DB_USER || "rafael",
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