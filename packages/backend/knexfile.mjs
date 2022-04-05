// Update with your config settings.

/**
 * @type {import("knex").Knex.Config}
 */
const config = {
  client: 'pg',
  connection: 'postgres://localhost:5432/postgres',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'dtek_migrations',
    directory: './migrations',
    loadExtensions: ['.mjs'],
  },
};

export default config;
