/**
 *
 * @param {import('knex').Knex} knex
 */
export const up = async (knex) => {
  await knex.schema.withSchema('dtek').createTable('lunch', (table) => {
    table
      .specificType('id', 'integer generated always as identity')
      .notNullable()
      .primary();
    table.string('resturant').notNullable();
    table.date('for_date').notNullable();
    table.boolean('preformatted').notNullable().defaultTo(false);
    table.string('lang').notNullable().defaultTo('Both');
  });

  await knex.schema.withSchema('dtek').createTable('menu_item', (table) => {
    table
      .specificType('id', 'integer generated always as identity')
      .notNullable()
      .primary();
    table.integer('lunch_id').notNullable();
    table.foreign('lunch_id').references('id').inTable('dtek.lunch');

    table.text('title');
    table.text('body').notNullable();
  });
};

/**
 *
 * @param {import('knex').Knex} knex
 */
export const down = async (knex) => {
  await knex.schema.withSchema('dtek').dropTable('menu_item');
  await knex.schema.withSchema('dtek').dropTable('lunch');
};
