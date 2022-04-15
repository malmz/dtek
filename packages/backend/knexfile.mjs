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

/**
 *
 * @param {string} table
 * @returns {string}
 */
export const onUpdateTrigger = (table) => {
  const tablePath = table.split('.');
  const tableName = tablePath[tablePath.length - 1];

  return `
CREATE TRIGGER ${tableName}_updated_at
BEFORE UPDATE ON ${table}
FOR EACH ROW
EXECUTE PROCEDURE dtek.on_update_timestamp();
`;
};
