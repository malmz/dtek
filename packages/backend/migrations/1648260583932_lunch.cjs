/* eslint-disable no-undef */
/**
 * @typedef { import("node-pg-migrate").MigrationBuilder } MigrationBuilder
 * @typedef { import("node-pg-migrate").ColumnDefinitions } ColumnDefinitions
 */

/**
 * @type {ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param {MigrationBuilder} pgm
 * @returns {Promise<void>}
 */
exports.up = async (pgm) => {
  pgm.createTable('dtek_lunch', {
    id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: {
        precedence: 'ALWAYS',
      },
    },
    resturant: { type: 'varchar(255)', notNull: true },
    for_date: { type: 'date', notNull: true },
    preformatted: { type: 'boolean', notNull: true, default: false },
    lang: { type: 'varchar(80)', notNull: true, default: 'Swedish' },
    title: { type: 'text' },
    body: { type: 'text', notNull: true },
  });
};

/**
 * @param {MigrationBuilder} pgm
 * @returns {Promise<void>}
 */
exports.down = async (pgm) => {
  pgm.dropTable('dtek_lunch');
};
