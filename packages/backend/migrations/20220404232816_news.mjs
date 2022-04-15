import { onUpdateTrigger } from '../knexfile.mjs';

/**
 *
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.withSchema('dtek').createTable('news', (table) => {
    table
      .specificType('id', 'integer generated always as identity')
      .notNullable()
      .primary();
    table.text('title').notNullable();
    table.text('body').notNullable();
    table.timestamps(true, true);
  });
  await knex.raw(onUpdateTrigger('dtek.news'));
};

/**
 *
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.withSchema('dtek').dropTable('news');
};
