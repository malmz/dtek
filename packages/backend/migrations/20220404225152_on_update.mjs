const ON_UPDATE_TIMESTAMP_FUNCTION = `
CREATE OR REPLACE FUNCTION dtek.on_update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';
`;

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = `DROP FUNCTION dtek.on_update_timestamp`;

/**
 *
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
};

/**
 *
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION);
};
