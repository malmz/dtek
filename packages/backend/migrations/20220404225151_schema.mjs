/**
 *
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.createSchema('dtek');
};

/**
 *
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.dropSchema('dtek', true);
};
