import { onUpdateTrigger } from '../knexfile.mjs';

/**
 *
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.withSchema('dtek').createTable('events', (table) => {
    table
      .specificType('id', 'integer generated always as identity')
      .notNullable()
      .primary();
    table.text('title').notNullable();
    table.text('body').notNullable();
    table.timestamps(true, true);
    table.timestamp('start_at').notNullable();
    table.timestamp('end_at').notNullable();
    table.text('place');
  });
  await knex.raw(onUpdateTrigger('dtek.events'));
};

/**
 *
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.withSchema('dtek').dropTable('events');
};
